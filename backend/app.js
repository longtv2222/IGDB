const express = require("express")
const bodyParser = require("body-parser")
const authentication = require('./middleware/authentication')
const mountRoutes = require('./routes/index.js')
const swaggerUI = require('swagger-ui-express') //For api documentation
const swaggerJSdoc = require('swagger-jsdoc');  //For api documentation
// Start server
const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'IGDB API',
      version: '1.0.0',
      description: 'API doumentation for international game database'
    }
  },
  apis: ['app.js'],
};

const swaggerDoc = swaggerJSdoc(swaggerOptions);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


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





