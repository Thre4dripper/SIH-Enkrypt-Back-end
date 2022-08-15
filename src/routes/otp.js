const express = require("express");
const router = express.Router();

const { userCheck } = require("../middlewares/userCheck");
const checkOtp = require("../middlewares/checkOTP");
const { generateOtp } = require("../controllers/otp/generateOtp");
const { verifyOtp } = require("../controllers/otp/verifyOtp");
const resetPass = require("../controllers/otp/resetPass");

router.post("/generate", userCheck("signin"), checkOtp, generateOtp);
router.post("/verify", userCheck("signin"), verifyOtp);
router.post("/resetpass", userCheck("signin"), resetPass);

module.exports = router;
