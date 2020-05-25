const { Router } = require('express');
const { logger } = require('../logger');

const { checkSchema } = require('express-validator');

const router = new Router();
const { Figure } = require('../model');
const { publishToQueue } = require('../producer/index');

  /**
 * This function comment is parsed by doctrine
 * @route GET /figure/list
 * @group order - Operations about figure
 * @returns {object} 200 - figure list
 * @returns {Error}  default - Something failed!
 */

router.get('/list', (req, res) => Figure
  .list()
  .then(res.send.bind(res)));

    /**
 * This function comment is parsed by doctrine
 * @route GET /figure/listFromOrder
 * @group figure - Operations about figure
 * @returns {object} 200 - figure list
 * @returns {Error}  default - Something failed!
 */
router.get('/listFromOrder', async (req, res) => {
  const { orderUuid } = req.query;

  return Figure
    .listFromOrder({ orderUuid })
    .then(res.send.bind(res));
});

  /**
 * This function comment is parsed by doctrine
 * @route POST /figure/insert
 * @group figure - Operations about figure
 * @param {string} profile.body.required - profile of figures
 * @param {string} status.body.required - status of figure TODO, PROGRESS, DONE
 * @param {string} userUuid.body.required - user's uuid
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */

router.post('/insert', (req, res) => {
  const { profile, status = 'TODO', orderUuid } = req.body;
  return Figure.create({
    profile,
    status,
    orderUuid,
  })
    .then(async (data) => {
      await publishToQueue('figureCreated', JSON.stringify(data));
      return data;
    })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.error(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

  /**
 * This function comment is parsed by doctrine
 * @route POST /figure/insert
 * @group figure - Operations about figure
 * @param {string} orderUuid.body.required - figure's uuid
 * @param {string} status.body.required - status of figure TODO, PROGRESS, DONE
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */
router.post('/update', (req, res) => {
  const { figureUuid, status } = req.body;
  return Figure.updateStatus({
    figureUuid,
    status,
  })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.error(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

module.exports = router;
