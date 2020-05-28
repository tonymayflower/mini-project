const app = require('./src/index');
const { logger } = require('./src/logger');

app.listen(3000, () => {
  logger.info('api listening on port 3000!');
});
