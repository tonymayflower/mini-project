const assert = require('assert');
const axios = require('axios');
const { When, Then } = require('cucumber');
const app = require('../../src/index');


const { logger } = require('../../src/logger');

this.app = app.listen(9999, () => {
  logger.info('api test listening on port 9999!');
});


this.user = {};
this.order = {};
this.figure = {};

When('I create a user', function (next) {
  axios({
    method: 'post',
    url: 'http://localhost:9999/user/insert',
    data: {
      email: 'mini-client@gmail.com',
      password: 'password',
    },
  }).then(({ data }) => {
    logger.info('response on user creation', data);
    this.user = data;
    next();
  })
    .catch((response) => {
      logger.info('error on creation', response);
      next();
    });
});

When('I create an order', function (next) {
  axios({
    method: 'post',
    url: 'http://localhost:9999/order/insert',
    data: {
      numberOfFigures: 1,
      pack: 'MiNi-Familly-Pack',
      userUuid: this.user.id,
    },
  }).then(({ data }) => {
    logger.info('response on order creation', data);
    this.order = data;
    next();
  })
    .catch((response) => {
      logger.info('error on creation', response);
      next();
    });
});

When('I create a figure', function (next) {
  axios({
    method: 'post',
    url: 'http://localhost:9999/figure/insert',
    data: {
      profile: 'this is a profile',
      orderUuid: this.order.id,
    },
  }).then(({ data }) => {
    logger.info('response on figure creation', data);
    this.figure = data;
    next();
  })
    .catch((response) => {
      logger.info('error on creation', response);
      next();
    });
});
Then('I should have created a figure', function (next) {
  console.log(this.figure);
  assert.equal(this.figure.profile, 'this is a profile');
  next();
});

Then('I should have created an order', function (next) {
  console.log(this.order);
  assert.equal(this.order.numberoffigures, '1');
  next();
});

Then('I should have created a user', function (next) {
  console.log(this.user);
  assert.equal(this.user.email, 'mini-client@gmail.com');
  next();
});
