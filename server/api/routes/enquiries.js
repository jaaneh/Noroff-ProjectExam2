const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/auth');

// Controller
const enquiriesController = require('../controllers/enquiries');

// Routes
router.get('/getAll', enquiriesController.get_all);
router.post('/add', enquiriesController.add_new);
router.delete('/delete/:id', middlewares.isLoggedIn, enquiriesController.delete);

module.exports = router;
