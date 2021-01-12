const clientRoutes = require("./client");
const developerRoutes = require("./developer");
const videoGameRoutes = require('./Video_Game');
const publisherRoutes = require('./publisher');
const playerRoutes = require('./player');
const teamRoutes = require('./team');
const competitionRoutes = require('./competition');
const esportRoutes = require('./esport');


module.exports = (app) => {
    app.use('/client', clientRoutes);
    app.use('/developer', developerRoutes);
    app.use('/Video_Game', videoGameRoutes);
    app.use('/publisher', publisherRoutes);
    app.use('/player', playerRoutes);
    app.use('/team', teamRoutes);
    app.use('/competition', competitionRoutes);
    app.use('/esport', esportRoutes)
}
