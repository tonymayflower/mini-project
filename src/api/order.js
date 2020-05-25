const { Router } = require('express');

const router = new Router();
const { Order } = require('../model');
const { logger } = require('../logger');

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
 * @param {BigInteger} numberOfFigures.body.required - number of figures
 * @param {BigInteger} price.body.required - price of figure
 * @param {string} userUuid.body.required - user's uuid
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */

router.post('/insert', (req, res) => {
  const { numberOfFigures, price, userUuid } = req.body;

  return Order.create({
    numberOfFigures,
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
router.post('/update', (req, res) => {
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
