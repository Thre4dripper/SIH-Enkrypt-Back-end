const express = require("express");
const router = express.Router();

const { signUpController } = require("../controllers/signUpController");
const { checkUser } = require("../controllers/UserCheck");

router.post("/check", checkUser("signup"));
router.post("/register", signUpController);

module.exports = router;
