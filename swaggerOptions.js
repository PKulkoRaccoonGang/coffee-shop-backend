const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Baker 75 Street API',
      version: '1.0.0',
      description: 'API documentation for Express.js application',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
