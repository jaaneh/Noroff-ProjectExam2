const jwt = require('jsonwebtoken');
require('dotenv').config();

const error = require('../lib/error');

function isLoggedIn(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, err => {
        if (err) {
          return error.invalidToken(req, res, next);
        } else {
          next();
        }
      });
    } else {
      return error.invalidToken(req, res, next);
    }
  } else {
    return error.missingToken(req, res, next);
  }
}

module.exports = {
  isLoggedIn
};
