const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/auth');

// Controller
const establishmentController = require('../controllers/establishments');

// Routes
router.get('/getAll', establishmentController.get_all);
router.get('/get/:id', establishmentController.get_one);
router.post('/add', middlewares.isLoggedIn, establishmentController.add_new);

module.exports = router;
