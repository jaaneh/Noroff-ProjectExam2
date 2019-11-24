const mongoose = require('mongoose');
require('dotenv').config();

const error = require('../lib/error');
const success = require('../lib/success');
const Enquiry = require('../models/enquiries');

exports.get_all = (req, res, next) => {
  Enquiry.find({})
    .exec()
    .then(enq => {
      return res.status(200).json({
        all: enq
      });
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};

exports.add_new = (req, res, next) => {
  const enquiry = new Enquiry({
    _id: mongoose.Types.ObjectId(),
    establishment: req.body.name,
    clientName: req.body.clientName,
    email: req.body.email,
    checkin: req.body.checkin,
    checkout: req.body.checkout
  });
  enquiry.save().then(result => {
    return success.addEnquirySuccess(req, res, next);
  });
};
