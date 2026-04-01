const alumnidao = require('../daos/alumnidao')
const bcrypt = require('bcrypt')
const bearerTokens = require('../shared-utils/bearerTokens')
const createResponse = require('../../utils/response')

class alumniservice{
    constructor(){ this.dao = new alumnidao() }

    async register(req){
        const { email, password } = req.body
        const hashed = await bcrypt.hash(password,10)
        const id = Date.now().toString() // simple ID
        return await this.dao.create(id,email,hashed)
    }

    async login(req){
        const { email, password } = req.body
        const user = await this.dao.retrieveByEmail(email)
        if(!user.success) return createResponse(false,null,null,'Invalid credentials')
        const match = await bcrypt.compare(password,user.data.password)
        if(!match) return createResponse(false,null,null,'Invalid credentials')
        const token = await bearerTokens.generateToken({id:user.data.id,email:user.data.email})
        return createResponse(true,token,null,null)
    }

async getToday() {
    // Check if already selected today
    let featured = await this.dao.getFeaturedAlumni();
    if (featured.success && featured.data) return featured;

    // Otherwise, select the winner
    const highestBid = await this.biddao.getHighestBid();
    if (highestBid.data <= 0) return { success: false, error: 'No bids today' };

    const winner = await this.biddao.getWinnerOfHighestBid(highestBid.data);
    await this.dao.setWinnerProfile(winner.alumniID);
    await this.biddao.updateAppearanceCount(winner.alumniID);

    return await this.dao.getFeaturedAlumni();
}
}

module.exports = alumniservice