import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Bookstore API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default {swaggerSpec, swaggerUi};
