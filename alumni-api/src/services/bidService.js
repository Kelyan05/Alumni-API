const biddao = require('../daos/biddao');
const alumnidao = require('../daos/alumnidao');
const createResponse = require('../utils/response');

class bidservice {
  constructor() {
    this.dao = new biddao();
    this.alumniDao = new alumnidao();
  }

  async create(req) {
    const alumni = await this.alumniDao.getAlumniByUserId(req.user.id);
    const { amount } = req.body;

    if (amount <= 0) return createResponse(false, null, null, 'Invalid amount');

    return await this.dao.create(alumni.data.id, amount);
  }

  async update(req) {
    const alumni = await this.alumniDao.getAlumniByUserId(req.user.id);
    return await this.dao.updateBid(alumni.data.id, req.body.amount);
  }

  async getStatus(req) {
    const alumni = await this.alumniDao.getAlumniByUserId(req.user.id);

    const highest = await this.dao.getHighestBid();
    const userHighest = await this.dao.getUserHighestBid(alumni.data.id);

    if (userHighest.data >= highest.data)
      return createResponse(true, { status: 'Winning' });

    return createResponse(true, { status: 'Losing' });
  }
}

module.exports = bidservice;