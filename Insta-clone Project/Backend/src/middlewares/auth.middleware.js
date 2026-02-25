const JWT = require('jsonwebtoken');

function verifyUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({
        message: "Unauthorised access"
    })

    let verifiedToken = null;

    try {
        verifiedToken = JWT.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorised Token"
        })
    }

    req.user = verifiedToken;
    next();
}

module.exports = verifyUser;