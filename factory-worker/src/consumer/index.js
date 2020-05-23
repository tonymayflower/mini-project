var q = 'myconsumqueue';
 
var open = require('amqplib').connect(process.env.MESSAGE_QUEUE);

// Consumer
function consume () {
    open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.consume(q, function(msg) {
        console.log('msg received ')
        if (msg !== null) {
          console.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
}
module.exports.consume = consume;
