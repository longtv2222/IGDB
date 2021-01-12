const swaggerUI = require('swagger-ui-express') //For api documentation
const swaggerJSdoc = require('swagger-jsdoc');  //For api documentation


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'IGDB API',
            version: '1.0.0',
            description: 'API doumentation for international game database',
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
        },
        basePath: '/',
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'token'
                }
            }
        },


    },
    apis: ['./routes/**.js'],
};

const swaggerDoc = swaggerJSdoc(swaggerOptions);


module.exports = {
    swaggerUI, swaggerDoc
}