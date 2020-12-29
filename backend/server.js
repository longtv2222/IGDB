const express = require("express")
const bodyParser = require("body-parser")
const authentication = require('./middleware/authentication')
const connection = require('./cloudDatabase')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;    //For debugging purpose only, need to be fixed

// Start server
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
  // console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

const signer = connection.signInAWS()
let token = signer.getAuthToken()
let client = connection.clientConnection(token)
let pool = connection.poolConnection(token)
client.connect()
pool.connect()

client.query('SELECT * FROM BYE;', (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows)
  }
})

const clientRoutes = require("./routes/client");
const developerRoutes = require("./routes/developer");
const videoGameRoutes = require('./routes/Video_Game');
const publisherRoutes = require('./routes/publisher');
const playerRoutes = require('./routes/player');
const teamRoutes = require('./routes/team');
const competitionRoutes = require('./routes/competition');
const esportRoutes = require('./routes/esport');


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

app.use('/client', clientRoutes);
app.use('/developer', developerRoutes);
app.use('/Video_Game', videoGameRoutes);
app.use('/publisher', publisherRoutes);
app.use('/player', playerRoutes);
app.use('/team', teamRoutes);
app.use('/competition', competitionRoutes);
app.use('/esport', esportRoutes)

app.get('/', (req, res) => {
  res.json('Welcome to IGDB!')
})




