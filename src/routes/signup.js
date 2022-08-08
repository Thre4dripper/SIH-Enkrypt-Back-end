const express = require("express");
const router = express.Router();

const signupController = require("../controllers/auth/signupController");
const registerController = require("../controllers/auth/registerController");

router.post("/", signupController);
router.post("/register", registerController);

module.exports = router;