const express = require('express');
const router = express.Router();

const signinController = require('../controllers/loginController');

router.get('/', signinController)

module.exports = router;