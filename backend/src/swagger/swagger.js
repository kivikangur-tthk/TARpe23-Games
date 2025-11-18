import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
    info: {
        title: 'My Games API',
        description: 'Description'
    },
    host: process.env.HOST+':'+process.env.PORT,
    tags: [{name: 'Games'}, {name: 'Users'}]
};

const outputFile = '../docs/swagger.json';
const routes = ['../routes/userRoutes.js', '../routes/gameRoutes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);