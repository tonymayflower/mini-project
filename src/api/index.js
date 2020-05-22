const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');

router.use('/user', user);
router.use('/toto', () =>  "titi");

module.exports = router;
