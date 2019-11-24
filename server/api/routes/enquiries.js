const express = require('express');
const router = express.Router();

// Controller
const enquiriesController = require('../controllers/enquiries');

// Routes
router.get('/getAll', enquiriesController.get_all);
router.post('/add', enquiriesController.add_new);

module.exports = router;
