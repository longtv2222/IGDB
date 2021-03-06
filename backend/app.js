const express = require("express")
const bodyParser = require("body-parser")
const authentication = require('./middleware/authentication')
const mountRoutes = require('./routes/index.js')
const { swaggerUI, swaggerDoc } = require('./middleware/documentation')
const rateLimiter = require('./middleware/rateLimit')
const helmet = require("helmet"); //Helmet for security
// Start server
const app = express()
app.set('trust proxy', 1);  //Express is behind nginx proxy
app.disable('x-powered-by') //Security
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(rateLimiter) //Apply rate limit based on IP
app.use(helmet());

let HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
  console.log("Server running on port " + HTTP_PORT)
});

//Authentication middleware for all post
app.post('*', authentication.checkToken, (res, req, next) => {
  next();
})

//Authentication middleware for all delete
app.delete('*', authentication.checkToken, (res, req, next) => {
  next();
})

//Authentication middleware for all modify
app.patch('*', authentication.checkToken, (res, req, next) => {
  next();
})

mountRoutes(app)    //Define all available routes

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle : "IGDB - International Game Database",
};
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options)); //Display swagger ui documentation




