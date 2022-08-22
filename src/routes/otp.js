const express = require("express");
const router = express.Router();

const userCheck = require("../middlewares/userCheck");
const checkOtp = require("../middlewares/checkOtp");
const { generateOtp } = require("../controllers/otp/generateOtp");
const verifyOtp = require("../controllers/otp/verifyOtp");
const resetPass = require("../controllers/otp/resetPass");

router.post("/generate", userCheck("resetPass"), checkOtp, generateOtp);
router.post("/verify", userCheck("resetPass"), verifyOtp);
router.post("/resetpass", userCheck("resetPass"), resetPass);

module.exports = router;
