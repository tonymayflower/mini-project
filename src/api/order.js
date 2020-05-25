const { Router } = require('express');

const router = new Router();
const { Order } = require('../model');
const { logger } = require('../logger');
const orderSchema = require('../schemas/order');
const schemaValidate = require('../middleware/schemaValidate');
/**
 * This function comment is parsed by doctrine
 * @route GET /order/list
 * @group order - Operations about order
 * @returns {object} 200 - order list
 * @returns {Error}  default - Something failed!
 */

router.get('/list', (req, res) => Order
  .list()
  .then(res.send.bind(res))
  .catch((err) => {
    logger.error(err);
    return res.status(500).send({ error: 'Something failed!' });
  }));

/**
 * This function comment is parsed by doctrine
 * @route POST /order/insert
 * @group order - Operations about order
 * @param {integer} numberOfFigures.body.required - number of order
 * @param {integer} pack.body.required - pack of order
 * @param {string} userUuid.body.required - user's uuid
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */

router.post('/insert', schemaValidate(orderSchema.insertorder), (req, res) => {
  const { numberOfFigures, pack, userUuid } = req.body;

  const famillyPack = 'MiNi-Familly-Pack';

  // unit price
  let unitPrice = 15;
  if (numberOfFigures > 50) {
    unitPrice = 9;
  }
  let price = unitPrice * numberOfFigures;
  if (pack === famillyPack) {
    price *= 0, 8;
  }
  return Order.create({
    numberOfFigures,
    pack,
    price,
    userUuid,
  })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.error(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

/**
 * This function comment is parsed by doctrine
 * @route POST /order/update
 * @group order - Operations about order
 * @param {string} orderUuid.body.required - order's uuid
 * @param {string} status.body.required - status of order SENT, READY, DEIVERED
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */
router.post('/insert', schemaValidate(orderSchema.updateOrder), (req, res) => {
  const { orderUuid, status } = req.body;

  return Order.updateStatus({
    orderUuid,
    status,
  })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.error(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

module.exports = router;
