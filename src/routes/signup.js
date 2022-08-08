const express = require("express");
const router = express.Router();

const {
  signupController,
  registerController,
} = require("../controllers/signUpController");

router.post("/", signupController);
router.post("/register", registerController);

module.exports = router;
