const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const error = require('../lib/error');
const success = require('../lib/success');
const User = require('../models/user');

function createTokenSendResponse(user, res, next) {
  const payload = {
    username: user.username,
    userId: user._id
  };
  jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: '12h'
    },
    (err, token) => {
      if (err) console.log(err);
      res.status(200).json({
        token: token
      });
    }
  );
}

// POST /user/login
exports.users_login = (req, res, next) => {
  User.findOneAndUpdate({ username: req.body.username }, { new: true })
    .then(user => {
      if (user) {
        user.last_login = req.body.last_login;
        user.save();
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            return createTokenSendResponse(user, res, next);
          }
          return error.notAuthorized(req, res, next);
        });
      } else {
        return error.notAuthorized(req, res, next);
      }
    })
    .catch(err => {
      return error.fiveHundred(req, res, next, err);
    });
};

exports.validate_token = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, err => {
        if (err) {
          return error.invalidToken(req, res, next);
        } else {
          return success.validToken(req, res, next);
        }
      });
    } else {
      return error.invalidToken(req, res, next);
    }
  } else {
    return error.missingToken(req, res, next);
  }
};
