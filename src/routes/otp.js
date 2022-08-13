const express = require("express");
const router = express.Router();

const { userCheck } = require("../controllers/userCheck");
const checkOtp = require("../middlewares/checkOTP");
const { generateOtp } = require("../controllers/OTP/generateOtp");

router.post("/generate", userCheck("signin"), checkOtp, generateOtp);
router.post("/resend", userCheck("signin"), generateOtp);
router.post("/verify", userCheck("signin"), checkOtp);

module.exports = router;
