const connection = require('../database/dbconfig')
const createResponse = require('../utils/response')

class biddao{
    async create(alumniID,amount){
        return new Promise(resolve=>{
            const query = `INSERT INTO bid(alumniID,amount,created_at) VALUES (?,?,datetime('now'))`
            connection.run(query,[alumniID,amount],function(err){
                if(err) return resolve(createResponse(false,null,null,'Database error'))
                resolve(createResponse(true,{bidID:this.lastID},null,null))
            })
        })
    }

    async getHighestBid(){
        return new Promise(resolve=>{
            const query = `SELECT MAX(amount) as highest FROM bid`
            connection.get(query,[],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'Database error'))
                resolve(createResponse(true,row.highest||0,null,null))
            })
        })
    }

    async getUserHighestBid(alumniID){
        return new Promise(resolve=>{
            const query = `SELECT MAX(amount) as highest FROM bid WHERE alumniID=?`
            connection.get(query,[alumniID],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'Database error'))
                resolve(createResponse(true,row.highest||0,null,null))
            })
        })
    }
}

module.exports = biddao