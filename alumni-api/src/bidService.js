const dao = require('../dao/bidDAO');

exports.placeBid = async (req) => {
  const user = req.session.user;
  await dao.placeBid(user.id, req.body.amount);
};