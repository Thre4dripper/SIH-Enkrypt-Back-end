const express = require("express");
const router = express.Router();

const { userCheck } = require("../controllers/userCheck");
const checkOtp = require("../middlewares/checkOTP");
const { generateOtp } = require("../controllers/OTP/generateOtp");
const { verifyOtp } = require("../controllers/OTP/verifyOtp");

router.post("/generate", userCheck("signin"), checkOtp, generateOtp);
router.post("/verify", userCheck("signin"), verifyOtp);

module.exports = router;
