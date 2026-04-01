const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (payload) => {
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_EXPIRY })
        return { accessToken: token, refreshToken }
    },
    verifyToken: (token) => jwt.verify(token, process.env.JWT_SECRET),
    verifyRefreshToken: (token) => jwt.verify(token, process.env.REFRESH_SECRET)
}