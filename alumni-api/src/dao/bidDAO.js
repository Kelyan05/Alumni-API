const db = require('../config/database');

//Place Bid
exports.placeBid = async (userId, amount) => {
  await db.query(
    'INSERT INTO bids (user_id, amount, bid_date, status) VALUES (?,?,CURDATE(),"pending")',
    [userId, amount]
  );
};

//View Today's Bid
exports.getTodayBids = async () => {
  const [rows] = await db.query('SELECT * FROM bids WHERE bid_date = CURDATE()');
  return rows;
};


//Cancel Bid


//Update Bid


//View Own Bid Status


//View Bidding History 


//View Monthly Limit Status