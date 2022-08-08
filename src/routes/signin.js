const express = require('express');
const router = express.Router();

const signinController = require('../controllers/auth/signinController');

router.get('/:username', signinController)

module.exports = router;