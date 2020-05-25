const bunyan = require('bunyan');

module.exports.logger = bunyan.createLogger({ name: 'factory-api' });
