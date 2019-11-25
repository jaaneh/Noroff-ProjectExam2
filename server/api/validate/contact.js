const Joi = require('@hapi/joi');

const schema = Joi.object({
  clientName: Joi.string()
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  message: Joi.string().required()
});

module.exports = schema;
