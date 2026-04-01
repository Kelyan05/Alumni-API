const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY
    });
  },

  verifyToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};