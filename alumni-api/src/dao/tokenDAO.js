const db = require('../config/database');

exports.createToken = async (userId, token, type, expiry) => {
  await db.query(
    'INSERT INTO tokens (user_id, token, type, expires_at) VALUES (?,?,?,?)',
    [userId, token, type, expiry]
  );
};

exports.findToken = async (token) => {
  const [rows] = await db.query('SELECT * FROM tokens WHERE token=?', [token]);
  return rows[0];
};

exports.deleteToken = async (token) => {
  await db.query('DELETE FROM tokens WHERE token=?', [token]);
};