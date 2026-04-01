const connection = require('../database/dbconfig');
const createResponse = require('../utils/response');

class alumnidao{
    async create(id,email,hashedPassword){
        return new Promise(resolve=>{
            const query = `INSERT INTO alumni (id,email,password) VALUES (?,?,?)`;
            connection.run(query,[id,email,hashedPassword], function(err){
                if(err) return resolve(createResponse(false,null,null,'Database error'));
                resolve(createResponse(true,{id,email},null,null));
            });
        });
    }

    async retrieveByEmail(email){
        return new Promise(resolve=>{
            const query = `SELECT * FROM alumni WHERE email=?`;
            connection.get(query,[email],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'Database error'));
                if(!row) return resolve(createResponse(false,null,null,'Not found'));
                resolve(createResponse(true,row,null,null));
            });
        });
    }

    async updateProfile(id, data){
        return new Promise(resolve=>{
            const query = `
                UPDATE alumni SET
                linkedinUrl=?, profilePic=?, degrees=?, certifications=?, licenses=?, shortCourses=?, employment=?
                WHERE id=?`;
            const params = [
                data.linkedinUrl,
                data.profilePic,
                JSON.stringify(data.degrees||[]),
                JSON.stringify(data.certifications||[]),
                JSON.stringify(data.licenses||[]),
                JSON.stringify(data.shortCourses||[]),
                JSON.stringify(data.employment||[]),
                id
            ];
            connection.run(query,params,function(err){
                if(err) return resolve(createResponse(false,null,null,'Database error'));
                resolve(createResponse(true,data,null,null));
            });
        });
    }

    async getFeaturedAlumni(){
        return new Promise(resolve=>{
            const query = `SELECT * FROM alumni WHERE isFeatured=1 LIMIT 1`;
            connection.get(query,[],(err,row)=>{
                if(err) return resolve(createResponse(false,null,null,'Database error'));
                resolve(createResponse(true,row,null,null));
            });
        });
    }

    async setWinnerProfile(alumniID){
        return new Promise(resolve=>{
            const query = `UPDATE alumni SET isFeatured=1 WHERE id=?`;
            connection.run(query,[alumniID], err=>{
                if(err) resolve({success:false});
                else resolve({success:true});
            });
        });
    }
}

module.exports = alumnidao;