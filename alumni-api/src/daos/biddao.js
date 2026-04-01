const connection = require('../database/dbconfig');
const createResponse = require('../utils/response');

class biddao {

  create(alumniID, amount) {
    return new Promise(resolve => {
      connection.run(
        `INSERT INTO bids (alumniID,amount) VALUES (?,?)`,
        [alumniID, amount],
        function (err) {
          if (err) return resolve(createResponse(false, null, null, 'Database error'));
          resolve(createResponse(true, { bidId: this.lastID }));
        }
      );
    });
  }

  updateBid(alumniID, amount) {
    return new Promise(resolve => {
      connection.run(
        `UPDATE bids SET amount=? WHERE alumniID=? AND amount < ?`,
        [amount, alumniID, amount],
        function (err) {
          if (err) return resolve(createResponse(false, null));
          if (this.changes === 0) return resolve(createResponse(false, null, null, 'Must increase bid'));
          resolve(createResponse(true));
        }
      );
    });
  }

  getHighestBid() {
    return new Promise(resolve => {
      connection.get(`SELECT MAX(amount) as highest FROM bids`, [], (err, row) => {
        resolve(createResponse(true, row.highest || 0));
      });
    });
  }

  getWinner() {
    return new Promise(resolve => {
      connection.get(
        `SELECT alumniID FROM bids ORDER BY amount DESC LIMIT 1`,
        [],
        (err, row) => {
          if (!row) return resolve(createResponse(false));
          resolve(createResponse(true, row));
        }
      );
    });
  }

  getUserHighestBid(alumniID) {
    return new Promise(resolve => {
      connection.get(
        `SELECT MAX(amount) as highest FROM bids WHERE alumniID=?`,
        [alumniID],
        (err, row) => {
          resolve(createResponse(true, row.highest || 0));
        }
      );
    });
  }
}

module.exports = biddao;