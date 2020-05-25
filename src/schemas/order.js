const Joi = require('joi');

const orderSchemas = {
  insertOrder: Joi.object().keys({
    numberOfFigures: Joi.number().integer().required(),
    pack: Joi.string().required(),
    userUuid: Joi.string().required(),
  }),
  updateOrder: Joi.object().keys({
    orderUuid: Joi.string().required(),
    status: Joi.string().required(),
  }),

};
module.exports = orderSchemas;
