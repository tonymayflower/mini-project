const express = require('express');

const app = express();
const morgan = require('morgan');
const expressSwagger = require('express-swagger-generator')(app);
const api = require('./api');
const { logger } = require('./logger');
const { swaggerDefinition } = require('./middleware/swagger');

expressSwagger(swaggerDefinition);

// default & healthcheck routes
app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(morgan('combined'));
app.use(express.json());
app.use(api);

module.exports = app;
