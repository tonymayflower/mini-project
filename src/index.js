const express = require('express');

const app = express();
const morgan = require('morgan');
const api = require('./api');
const logger = require('./logger');

// default & healthcheck routes
app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.json());
app.use(api);
app.use(morgan('common'));

app.listen(3000, () => {
  logger.info('api listening on port 3000!');
});
