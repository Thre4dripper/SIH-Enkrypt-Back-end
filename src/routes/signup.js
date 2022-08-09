const express = require("express");
const router = express.Router();

const { signUpController } = require("../controllers/signUpController");
const { userCheck } = require("../controllers/userCheck");
const { validateUser } = require("../middlewares/auth");

router.post("/check", userCheck("signup"));
router.post("/", validateUser("signup"), signUpController);

module.exports = router;
