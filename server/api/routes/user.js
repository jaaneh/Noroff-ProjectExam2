const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/user');

// Routes
router.post('/login', userController.users_login);
router.get('/validate', userController.validate_token);

module.exports = router;
