const { Router } = require('express');
const { logger } = require('../logger');

const router = new Router();
const { User } = require('../model');

router.get('/list', async (req, res) => User
  .list()
  .then(res.send.bind(res))
  .catch((err) => {
    logger.err(err);
    return res.status(500).send({ error: 'Something failed!' });
  }));

router.post('/insert', (req, res) => {
  const { email, password } = req.body;

  return User.create({
    email,
    password,
  })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.err(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

module.exports = router;
