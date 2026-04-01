const alumnidao = require('../daos/alumnidao');
const bcrypt = require('bcrypt');
const bearerTokens = require('../utils/bearerTokens');
const createResponse = require('../utils/response');
const { validateEmailDomain } = require('../middleware/inputValidation');

class alumniservice{
    constructor(){ this.dao = new alumnidao() }

    async register(req){
        const { email,password } = req.body;
        if(!validateEmailDomain(email)) return createResponse(false,null,null,'Invalid university email');
        const hashed = await bcrypt.hash(password,10);
        const id = Date.now().toString();
        return await this.dao.create(id,email,hashed);
    }

    async login(req){
        const { email,password } = req.body;
        const user = await this.dao.retrieveByEmail(email);
        if(!user.success) return createResponse(false,null,null,'Invalid credentials');
        const match = await bcrypt.compare(password,user.data.password);
        if(!match) return createResponse(false,null,null,'Invalid credentials');
        const token = bearerTokens.generateToken({id:user.data.id,email:user.data.email});
        return createResponse(true,token,null,null);
    }

    async getToday(biddao){
        let featured = await this.dao.getFeaturedAlumni();
        if(featured.success && featured.data) return featured;

        const highestBid = await biddao.getHighestBid();
        if(highestBid.data <= 0) return createResponse(false,null,null,'No bids today');

        const winner = await biddao.getWinnerOfHighestBid(highestBid.data);
        await this.dao.setWinnerProfile(winner.alumniID);
        await biddao.updateAppearanceCount(winner.alumniID);

        return await this.dao.getFeaturedAlumni();
    }

    async updateProfile(req){
        return await this.dao.updateProfile(req.user.id, req.body);
    }
}

module.exports = alumniservice;