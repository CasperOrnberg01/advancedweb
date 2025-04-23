const express         = require('express');
const router          = express.Router();
const usersController = require('../controllers/usersController');

//rekisteröinti POST
router.post('/register', usersController.registerUser);
//LOGin POST
router.post('/login',    usersController.authenticate);

module.exports = router;
