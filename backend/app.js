const express = require("express")
const bodyParser = require("body-parser")
const authentication = require('./middleware/authentication')
const mountRoutes = require('./routes/index.js')

// Start server
const app = express()
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





