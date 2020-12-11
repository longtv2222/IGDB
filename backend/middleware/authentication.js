var jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.token, 'NEKROZ OF BRIONAC')
        req.myData = decode
        next();
    } catch (error) {
        res.json("Authentication failed");
    }
}