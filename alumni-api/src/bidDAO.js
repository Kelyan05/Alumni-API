const db = require('../config/database');

exports.placeBid = async (userId, amount) => {
  await db.query(
    'INSERT INTO bids (user_id, amount, bid_date, status) VALUES (?,?,CURDATE(),"pending")',
    [userId, amount]
  );
};

exports.getTodayBids = async () => {
  const [rows] = await db.query('SELECT * FROM bids WHERE bid_date = CURDATE()');
  return rows;
};