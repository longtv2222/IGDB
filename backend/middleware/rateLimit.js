const rateLimit = require("express-rate-limit");

var keyGenerator1 = function (req /*, res*/) {
  return req.headers['x-real-ip']
}

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator : keyGenerator1,
});

module.exports = limiter;