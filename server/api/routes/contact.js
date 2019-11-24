const express = require('express');
const router = express.Router();

// Controller
const contactsController = require('../controllers/contact');

// Routes
router.get('/getAll', contactsController.get_all);
router.post('/add', contactsController.add_new);

module.exports = router;
