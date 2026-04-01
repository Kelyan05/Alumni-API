const alumnidao = require('../daos/alumnidao');
const biddao = require('../daos/biddao');
const bcrypt = require('bcrypt');
const bearerTokens = require('../utils/bearerTokens');
const createResponse = require('../utils/response');
const { validateEmailDomain } = require('../middleware/inputValidation');

class alumniservice {
  constructor() {
    this.dao = new alumnidao();
    this.biddao = new biddao();
  }

  async register(req) {
    const { email, password } = req.body;

    if (!validateEmailDomain(email))
      return createResponse(false, null, 'Invalid university email');

    const existing = await this.dao.getUserByEmail(email);
    if (existing.success) return createResponse(false, null, 'User already exists');

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await this.dao.createUser(email, hashed);
    if (!user.success) return user;

    await this.dao.createAlumni(user.data.userId);

    return createResponse(true, { email });
  }

  async login(req) {
    const { email, password } = req.body;

    const user = await this.dao.getUserByEmail(email);
    if (!user.success) return createResponse(false, null, 'Invalid credentials');

    const match = await bcrypt.compare(password, user.data.password);
    if (!match) return createResponse(false, null, 'Invalid credentials');

    const token = bearerTokens.generateToken({ id: user.data.id, email: user.data.email });

    return createResponse(true, token);
  }

  async getToday() {
    const featured = await this.dao.getFeatured();
    if (featured.data) return featured;

    const winner = await this.biddao.getWinner();
    if (!winner.success) return createResponse(false, null, 'No bids');

    this.dao.resetFeatured();
    this.dao.setWinner(winner.data.alumniID);
    this.dao.incrementAppearance(winner.data.alumniID);

    return await this.dao.getFeatured();
  }

  async updateProfile(req) {
    const alumni = await this.dao.getAlumniByUserId(req.user.id);
    return await this.dao.updateProfile(alumni.data.id, req.body);
  }
}

module.exports = alumniservice;