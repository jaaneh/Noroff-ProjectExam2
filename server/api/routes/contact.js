const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/auth');

// Controller
const contactsController = require('../controllers/contact');

// Routes
router.get('/getAll', contactsController.get_all);
router.post('/add', contactsController.add_new);
router.delete('/delete/:id', middlewares.isLoggedIn, contactsController.delete);

module.exports = router;
