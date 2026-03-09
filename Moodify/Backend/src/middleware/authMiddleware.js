const JWT = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

async function validateUser(req, res, next) {
    const { token } = await req.cookies;

    if (!token) return res.status(401).json({
        message: "Unauthorised access, Token not found"
    })

    const blacklistToken = await redis.get(token);

    if(blacklistToken) return res.status(401).json({
        message:"Unacuthorised access"
    })

    try {
        let verifiedToken = JWT.verify(token, process.env.JWT_SECRET);

        req.user = verifiedToken.id;

        next();
    }

    catch (err) {

        return res.status(401).json({
            message: "Unauthorised access"
        })

    }


}

module.exports = validateUser