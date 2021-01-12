const jwt = require('jsonwebtoken')
const key = 'NEKROZ OF BRIONAC';

const checkToken = (req, res, next) => {
    try {
        if (req.originalUrl == '/client/paid_user/signup')
            return next();
        const decode = jwt.verify(req.headers.token, key)
        req.myData = decode
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
}

const jwtSignIn = (username, u_id) => {
    return jwt.sign({
        data: username,
        id: u_id,
    }, key,
        {
            expiresIn: "2h"
        });
}

module.exports = {
    checkToken, jwtSignIn
}