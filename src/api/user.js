const { Router } = require('express');
const { logger } = require('../logger');
const router = new Router();
const { User } = require('../model');
const userSchema = require('../schemas/user');
const schemaValidate = require('../middleware/schemaValidate')
router.get('/list', async (req, res) => User
  .list()
  .then(res.send.bind(res))
  .catch((err) => {
    logger.error(err);
    return res.status(500).send({ error: 'Something failed!' });
  }));

router.post('/insert',schemaValidate(userSchema.insertUser),(req, res) => {
  const { email, password } = req.body;

  return User.create({
    email,
    password,
  })
    .then(res.send.bind(res))
    .catch((err) => {
      logger.error(err);
      return res.status(500).send({ error: 'Something failed!' });
    });
});

module.exports = router;
