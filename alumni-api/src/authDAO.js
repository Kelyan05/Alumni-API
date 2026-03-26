const db = require('../config/database');

exports.createUser = async (email, password) => {
  await db.query('INSERT INTO users (email, password) VALUES (?,?)', [email, password]);
};

exports.findUser = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
  return rows[0];
};