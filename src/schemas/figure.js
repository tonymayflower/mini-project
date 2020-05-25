const Joi = require('joi');

const figureSchemas = {
  insertFigure: Joi.object().keys({
    profile: Joi.string().required(),
    status: Joi.string().required(),
    userUuid: Joi.string().required(),
  }),
  updateFigure: Joi.object().keys({
    figureUuid: Joi.string().required(),
    status: Joi.string().required(),
  }),
};
module.exports = figureSchemas;
