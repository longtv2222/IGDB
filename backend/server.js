var express = require("express")
var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const authentication = require('./middleware/authentication')

// Start server
var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});


const clientRoutes = require("./api/client");
const developerRoutes = require("./api/developer");
const videoGameRoutes = require('./api/Video_Game');
const publisherRoutes = require('./api/publisher');
const playerRoutes = require('./api/player');
const teamRoutes = require('./api/team');
const competitionRoutes = require('./api/competition');

app.post('*', authentication, (req, res, next) => {
    next();
})

app.delete('*', authentication, (req, rest, next) => {
    next();
})

app.use('/client', clientRoutes);
app.use('/developer', developerRoutes);
app.use('/Video_Game', videoGameRoutes);
app.use('/publisher', publisherRoutes);
app.use('/player', playerRoutes);
app.use('/team', teamRoutes);
app.use('/competition', competitionRoutes);







