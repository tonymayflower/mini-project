const express = require('express');

const app = express();
const morgan = require('morgan');
const logger = require('./src/logger');
const { consume } = require('./src/consumer');

// default & healthcheck routes
app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.json());
app.use(morgan('common'));

app.listen(8080, () => {
  consume();
  logger.info('worker listening on port 8080!');
});
