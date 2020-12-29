const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (req.originalUrl == '/client/paid_user/signup')
            return next();
        console.log(req.originalUrl);
        const decode = jwt.verify(req.headers.token, 'NEKROZ OF BRIONAC')
        req.myData = decode
        next();
    } catch (error) {
        res.json("Authentication failed");
    }
} 