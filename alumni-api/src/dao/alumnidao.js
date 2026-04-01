const connection = require('../database/dbconfig')
const createResponse = require('../../shared-utils/response')

class alumnidao{
    async create(id, email, hashedPassword){
        return new Promise((resolve)=>{
            const query = `INSERT INTO alumni (id,email,password) VALUES (?,?,?)`
            connection.run(query,[id,email,hashedPassword], function(err){
                if(err) return resolve(createResponse(false,null,null,'DB Error'))
                resolve(createResponse(true,{id,email},null,null))
            })
        })
    }

    async retrieveByEmail(email){
        return new Promise((resolve)=>{
            const query = `SELECT * FROM alumni WHERE email=?`
            connection.get(query,[email],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'DB Error'))
                if(!row) return resolve(createResponse(false,null,null,'Not found'))
                resolve(createResponse(true,row,null,null))
            })
        })
    }

    async updateProfile(id, data){
        return new Promise((resolve)=>{
            const query = `UPDATE alumni SET linkedinUrl=?, profilePic=? WHERE id=?`
            connection.run(query,[data.linkedinUrl,data.profilePic,id], function(err){
                if(err) return resolve(createResponse(false,null,null,'DB Error'))
                resolve(createResponse(true,data,null,null))
            })
        })
    }

    async getFeaturedAlumni(){
        return new Promise((resolve)=>{
            const query = `SELECT * FROM alumni WHERE isFeatured=1 LIMIT 1`
            connection.get(query,[],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'DB Error'))
                resolve(createResponse(true,row,null,null))
            })
        })
    }
}

module.exports = alumnidao