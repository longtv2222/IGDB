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




