const dao = require('../dao/authDAO');
const bcrypt = require('../utils/bcryptUtil');


exports.register = async (email, password) => {
  const hashed = await bcrypt.hash(password);
  await dao.createUser(email, hashed);
};

exports.login = async (req) => {
  const { email, password } = req.body;

  const user = await dao.findUser(email);
  if (!user) return false;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return false;

  req.session.user = user;
  return true;
};