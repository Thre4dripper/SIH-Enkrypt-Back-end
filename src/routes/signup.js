const express = require("express");
const router = express.Router();

const signUpController = require("../controllers/signup/signUpController");
const userCheck = require("../middlewares/userCheck");
const validateUser = require("../middlewares/auth");

router.post("/check", userCheck("signup"));
router.post("/", validateUser("signup"), signUpController);

module.exports = router;
