const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const order = require('./order');
const figure = require('./figure');

router.use('/user', user);
router.use('/order', order);
router.use('/figure', figure);

module.exports = router;
