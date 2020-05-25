const Joi = require('joi') 

const userSchemas = { 
    insertUser: Joi.object().keys({ 
        email: Joi.string().email().required(),
        password: Joi.string().required() 
      }) 

}; 
module.exports = userSchemas;