const express = require("express");
const router = express.Router();

const signupController = require("../controllers/register/signupController");
const registerController = require("../controllers/register/registerController");

router.post("/", signupController);
router.post("/register", registerController);

module.exports = router;