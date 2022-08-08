const express = require("express");
const router = express.Router();

const {
  checkDuplicateUser,
  signUpController,
} = require("../controllers/signUpController");

router.post("/check", checkDuplicateUser);
router.post("/register", signUpController);

module.exports = router;
