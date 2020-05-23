const amqp = require('amqplib/callback_api');

let ch = null;

function bail(err) {
    console.error(err);
    process.exit(1);
  }

amqp.connect(process.env.MESSAGE_QUEUE, function (err, conn) {
    if (err != null) bail(err);
    conn.createChannel(function (err, channel) {
        console.log("channel", channel)
        ch = channel;
    });
});

async function publishToQueue (queueName, data) {
    ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
}
module.exports.publishToQueue = publishToQueue;
