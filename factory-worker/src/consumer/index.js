var q = 'figureCreated';
 
var open = require('amqplib').connect(process.env.MESSAGE_QUEUE);
const axios = require('axios');
// Consumer
function consume () {
    open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.consume(q, async function(msg) {
        console.log('msg received ')
        if (msg !== null) {
          console.log(msg.content.toString());
          let figureUuid = msg.content.id
          await axios.post('http://app:3000/figure/update', {
              figureUuid,
              status: "DONE"
          }, {
            cancelToken: source.token
          })
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
}
module.exports.consume = consume;
