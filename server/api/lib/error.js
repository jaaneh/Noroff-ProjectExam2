function notAuthorized(req, res, next) {
  return res.status(401).json({
    error: {
      status: 401,
      message: 'Not Authorized'
    }
  });
}

function fiveHundred(req, res, next, err) {
  return res.status(500).json({
    error: {
      status: 500,
      message: err
    }
  });
}

function invalidToken(req, res, next) {
  return res.status(401).json({
    valid: false,
    error: {
      status: 401,
      message: 'Invalid token'
    }
  });
}

function missingToken(req, res, next) {
  return res.status(400).json({
    valid: false,
    error: {
      status: 400,
      message: 'No token given'
    }
  });
}

module.exports = {
  notAuthorized,
  fiveHundred,
  invalidToken,
  missingToken
};
