const amqp = require('amqplib/callback_api');
const { logger } = require('../logger');

let ch = null;

function bail(err) {
  logger.error(err);
  process.exit(1);
}

amqp.connect(process.env.MESSAGE_QUEUE, (err, conn) => {
  if (err != null) bail(err);
  conn.createChannel((error, channel) => {
    logger.error(error);
    ch = channel;
  });
});

async function publishToQueue(queueName, data) {
  ch.sendToQueue(queueName, Buffer.from((data), { persistent: true }));
  logger.info('msg sent', data);
}
module.exports.publishToQueue = publishToQueue;
