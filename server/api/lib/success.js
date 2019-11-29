function addEstablishmentSuccess(req, res, next) {
  return res.status(200).json({
    success: {
      status: 200,
      message: 'Establishment added'
    }
  });
}

function addEnquirySuccess(req, res, next) {
  return res.status(200).json({
    success: {
      status: 200,
      message: 'Enquiry added'
    }
  });
}

function addContactSuccess(req, res, next) {
  return res.status(200).json({
    success: {
      status: 200,
      message: 'Contact added'
    }
  });
}
function removeMessageSuccess(req, res, next) {
  return res.status(200).json({
    success: {
      status: 200,
      message: 'Message removed'
    }
  });
}

function validToken(req, res, next) {
  return res.status(200).json({
    valid: true,
    success: {
      status: 200,
      message: 'Valid token'
    }
  });
}

module.exports = {
  addEstablishmentSuccess,
  addEnquirySuccess,
  addContactSuccess,
  removeMessageSuccess,
  validToken
};
