const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next)=> {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: "Access Denied!" })

    try {
        const verified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    }
    catch (err) {
        res.status(400).json({ error: 'Invalid Token!' })
    }
}