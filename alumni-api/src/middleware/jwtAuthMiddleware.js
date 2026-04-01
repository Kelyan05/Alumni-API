const bearerTokens = require('../utils/bearerTokens');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const user = bearerTokens.verifyToken(token);
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};