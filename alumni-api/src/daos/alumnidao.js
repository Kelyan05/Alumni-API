const connection = require('../database/dbconfig');
const createResponse = require('../utils/response');

class alumnidao {

  createUser(email, hashedPassword) {
    return new Promise(resolve => {
      connection.run(
        `INSERT INTO users (email,password) VALUES (?,?)`,
        [email, hashedPassword],
        function (err) {
          if (err) return resolve(createResponse(false, null, null, 'User exists'));
          resolve(createResponse(true, { userId: this.lastID }));
        }
      );
    });
  }

  createAlumni(userId) {
    return new Promise(resolve => {
      connection.run(
        `INSERT INTO alumni (userId) VALUES (?)`,
        [userId],
        function (err) {
          if (err) return resolve(createResponse(false, null, null, 'Database error'));
          resolve(createResponse(true, { alumniId: this.lastID }));
        }
      );
    });
  }

  getUserByEmail(email) {
    return new Promise(resolve => {
      connection.get(
        `SELECT * FROM users WHERE email=?`,
        [email],
        (err, row) => {
          if (err || !row) return resolve(createResponse(false, null));
          resolve(createResponse(true, row));
        }
      );
    });
  }

  getAlumniByUserId(userId) {
    return new Promise(resolve => {
      connection.get(
        `SELECT * FROM alumni WHERE userId=?`,
        [userId],
        (err, row) => {
          if (err || !row) return resolve(createResponse(false, null));
          resolve(createResponse(true, row));
        }
      );
    });
  }

  updateProfile(id, data) {
    return new Promise(resolve => {
      connection.run(
        `UPDATE alumni SET linkedinUrl=?, profilePic=?, updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
        [data.linkedinUrl, data.profilePic, id],
        err => {
          if (err) return resolve(createResponse(false, null, null, 'Database error'));
          resolve(createResponse(true, data));
        }
      );
    });
  }

  getFeatured() {
    return new Promise(resolve => {
      connection.get(`SELECT * FROM alumni WHERE isFeatured=1`, [], (err, row) => {
        if (err) return resolve(createResponse(false, null, null, 'Database error'));
        resolve(createResponse(true, row));
      });
    });
  }

  resetFeatured() {
    connection.run(`UPDATE alumni SET isFeatured=0`);
  }

  setWinner(id) {
    connection.run(`UPDATE alumni SET isFeatured=1 WHERE id=?`, [id]);
  }

  incrementAppearance(id) {
    connection.run(`
      UPDATE alumni 
      SET thisMonthAppearanceCount = thisMonthAppearanceCount + 1 
      WHERE id=? AND thisMonthAppearanceCount < 3
    `, [id]);
  }
}

module.exports = alumnidao;