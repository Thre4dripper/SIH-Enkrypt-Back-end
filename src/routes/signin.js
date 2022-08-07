const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signinController');

router.get('/:username', signinController)

module.exports = router;