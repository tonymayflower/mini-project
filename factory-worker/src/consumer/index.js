const open = require('amqplib').connect(process.env.MESSAGE_QUEUE);
const axios = require('axios');
const {logger} = require('../logger');

const timeToBuildFigure = 2000;
const q = 'figureCreated';

// Consumer
function consume() {
  open.then((conn) => conn.createChannel())
    .then((ch) => ch.assertQueue(q).then(() => ch.consume(q, async (msg) => {
      logger.info('msg received ');
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        const figureUuid = content.id;
        logger.info('figure received : ', figureUuid);
        logger.info('building figure :', figureUuid);
        await new Promise((r) => setTimeout(r, timeToBuildFigure));
        logger.info('building finisef for figure :', figureUuid);
        await axios({
          method: 'post',
          url: 'http://app:3000/figure/update',
          data: {
            figureUuid,
            status: 'DONE',
          },
        }).then(({ data }) => {
          logger.info('response on update', data);
        })
          .catch(({ response }) => {
            logger.info('error on update', response.data);
          });
        ch.ack(msg);
      }
    }))).catch(logger.error);
}
module.exports.consume = consume;
