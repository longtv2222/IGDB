const express = require("express")
const bodyParser = require("body-parser")
const authentication = require('./middleware/authentication')
const { pool } = require('./db/cloudDatabase')
const mountRoutes = require('./routes/index.js')

// Start server
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
  console.log("Server running on port " + HTTP_PORT)
});

pool.query('SELECT * FROM BYE;').then(res => console.log(res.rows)).catch(err => console.log(err.stack));


//Authentication middleware for all post
app.post('*', authentication, (res, req, next) => {
  next();
})

//Authentication middleware for all delete
app.delete('*', authentication, (res, req, next) => {
  next();
})

//Authentication middleware for all modify
app.patch('*', authentication, (res, req, next) => {
  next();
})

mountRoutes(app)    //Define all available routes





