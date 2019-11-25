const date = require('@hapi/joi-date');
const Joi = require('@hapi/joi').extend(date);

const schema = Joi.object({
  name: Joi.string().required(),

  clientName: Joi.string()
    .min(2)
    .max(30)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  checkin: Joi.date()
    .format('YYYY-MM-DD')
    .required(),

  checkout: Joi.date()
    .format('YYYY-MM-DD')
    .required()
});

module.exports = schema;
