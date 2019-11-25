const mongoose = require('mongoose');
require('dotenv').config();

const error = require('../lib/error');
const success = require('../lib/success');
const Establishment = require('../models/establishments');
const schema = require('../validate/establishments');

exports.get_all = (req, res, next) => {
  Establishment.find({})
    .exec()
    .then(est => {
      return res.status(200).json({
        all: est
      });
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};

exports.get_one = (req, res, next) => {
  Establishment.findOne({ id: req.params.id })
    .exec()
    .then(est => {
      return res.status(200).json({
        one: est
      });
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};

exports.add_new = (req, res, next) => {
  const validate = schema.validate(req.body);

  if (!validate.error) {
    const establishment = new Establishment({
      _id: mongoose.Types.ObjectId(),
      establishmentName: req.body.name,
      establishmentEmail: req.body.email,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      maxGuests: req.body.maxGuests,
      googleLat: req.body.googleLat,
      googleLong: req.body.googleLong,
      description: req.body.description,
      selfCatering: req.body.selfCatering
    });
    establishment.save().then(result => {
      return success.addEstablishmentSuccess(req, res, next);
    });
  } else {
    const err = validate.error;

    return error.validationError(req, res, next, err);
  }
};
