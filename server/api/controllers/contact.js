const mongoose = require('mongoose');
require('dotenv').config();

const error = require('../lib/error');
const success = require('../lib/success');
const Contact = require('../models/contact');
const schema = require('../validate/contact');

exports.get_all = (req, res, next) => {
  Contact.find({})
    .exec()
    .then(messages => {
      return res.status(200).json({
        all: messages
      });
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};

exports.add_new = (req, res, next) => {
  const validate = schema.validate(req.body);

  if (!validate.error) {
    const contact = new Contact({
      _id: mongoose.Types.ObjectId(),
      clientName: req.body.clientName,
      email: req.body.email,
      message: req.body.message
    });
    contact.save().then(result => {
      return success.addContactSuccess(req, res, next);
    });
  } else {
    const err = validate.error;

    return error.validationError(req, res, next, err);
  }
};

exports.delete = (req, res, next) => {
  Contact.findByIdAndRemove({ _id: req.params.id })
    .exec()
    .then(response => {
      return success.removeMessageSuccess(req, res, next);
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};
