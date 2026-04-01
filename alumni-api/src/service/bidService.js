const biddao = require('../daos/biddao')
const createResponse = require('../../utils/response')

class bidservice{
    constructor(){ this.dao = new biddao() }

    async create(req){
        const alumniID = req.user.id
        const { amount } = req.body
        return await this.dao.create(alumniID,amount)
    }

    async getStatus(req){
        const alumniID = req.user.id
        const highest = await this.dao.getHighestBid()
        const userHighest = await this.dao.getUserHighestBid(alumniID)
        if(userHighest.data >= highest.data) return createResponse(true,'Winning')
        return createResponse(true,'Losing')
    }
}

module.exports = bidservice