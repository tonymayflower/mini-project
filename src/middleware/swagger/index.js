
module.exports.swaggerDefinition = {
  swaggerDefinition: {
    info: {
      description: 'Mini api',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: [
      'application/json',
      'application/xml',
    ],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, // app absolute path
  files: ['../../api/*.js'], // Path to the API handle folder
};
