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
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
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

const clientRoutes = require("./routes/client");
app.use('/client', clientRoutes);

const developerRoutes = require("./routes/developer");
app.use('/developer', developerRoutes);

const videoGameRoutes = require('./routes/Video_Game');
app.use('/Video_Game', videoGameRoutes);

const publisherRoutes = require('./routes/publisher');
app.use('/publisher', publisherRoutes);

const playerRoutes = require('./routes/player');
app.use('/player', playerRoutes);

const teamRoutes = require('./routes/team');
app.use('/team', teamRoutes);

const competitionRoutes = require('./routes/competition');
app.use('/competition', competitionRoutes);

const esportRoutes = require('./routes/esport');
app.use('/esport', esportRoutes)

app.get('/', (req, res) => {
  res.json('Welcome to IGDB!')
})




