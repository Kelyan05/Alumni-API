const bearerTokens = require('../shared-utils/bearerTokens')

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'] || req.cookies['jwt-token']
    if(!authHeader) return res.status(401).json({ error: 'No token' })

    const token = authHeader.split(' ')[1] || authHeader
    try {
        const user = bearerTokens.verifyToken(token)
        req.user = user
        next()
    } catch(e) {
        return res.status(403).json({ error: 'Invalid token' })
    }
}