var express = require("express")
var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const authentication = require('./middleware/authentication')



// Start server
var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    // console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


const { Pool, Client } = require('pg')
const AWS = require('aws-sdk')

var signer = new AWS.RDS.Signer({
    // configure options
    region: 'us-east-2',
    username: 'db_user',
    hostname: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
    port: 5432
});

var token = signer.getAuthToken();

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;    //For debugging purpose only, need to be fixed
const client = new Client({
    user: 'db_user',
    host: 'igdb.cmxcawzmeu8f.us-east-2.rds.amazonaws.com',
    database: 'IGDB',
    password: token,
    port: 5432,
    ssl : true,
  })
client.connect();
client.query('INSERT INTO bye VALUES(3);', (err, res) => {
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

app.post('*', authentication, (res, req, next) => {
    next();
})

app.delete('*', authentication, (res, req, next) => {
    next();
})

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




