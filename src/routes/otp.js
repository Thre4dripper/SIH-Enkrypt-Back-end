const express = require("express");
const router = express.Router();

const { userCheck } = require("../controllers/userCheck");
const checkOtp = require("../middlewares/checkOTP");
const { generateOtp } = require("../controllers/OTP/generateOtp");
const { verifyOtp } = require("../controllers/OTP/verifyOtp");
const resetPass = require("../controllers/OTP/resetPass");

router.post("/generate", userCheck("signin"), checkOtp, generateOtp);
router.post("/verify", userCheck("signin"), verifyOtp);
router.post("/resetpass", userCheck("signin"), resetPass);

module.exports = router;
