const { Router } = require('express');
const { logger } = require('../logger');
const router = new Router();
const { User } = require('../model');
const userSchema = require('../schemas/user');
const schemaValidate = require('../middleware/schemaValidate')


  /**
 * This function comment is parsed by doctrine
 * @route GET /user/list
 * @returns {object} 200 - user list
 * @returns {Error}  default - Something failed!
 */

router.get('/list', async (req, res) => User
  .list()
  .then(res.send.bind(res))
  .catch((err) => {
    logger.error(err);
    return res.status(500).send({ error: 'Something failed!' });
  }));

  /**
 * This function comment is parsed by doctrine
 * @route POST /user/insert
 * @group user - Operations about user
 * @param {string} email.body.required - username or email - eg: user@domain
 * @param {string} password.body.required - user's password.
 * @returns {object} 200 - user info
 * @returns {Error}  default - Something failed!
 */

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
