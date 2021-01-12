const swaggerUI = require('swagger-ui-express') //For api documentation
const swaggerJSdoc = require('swagger-jsdoc');  //For api documentation

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'IGDB API',
            version: '1.0.0',
            description: 'API doumentation for international game database'
        }
    },
    apis: ['./routes/**.js'],
};

const swaggerDoc = swaggerJSdoc(swaggerOptions);


module.exports = {
    swaggerUI, swaggerDoc
}