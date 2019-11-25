const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string()
    .email()
    .required(),

  imageUrl: Joi.string()
    .uri()
    .required(),

  price: Joi.number().required(),

  maxGuests: Joi.number()
    .positive()
    .required(),

  googleLat: Joi.number().required(),

  googleLong: Joi.number().required(),

  description: Joi.string().required(),

  selfCatering: Joi.boolean().required()
});

module.exports = schema;
