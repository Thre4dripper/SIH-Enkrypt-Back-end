const bcrypt = require("bcrypt");
const User = require("../../models/user");

const verifyOtp = async (req, res) => {
  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ message: "Empty Field(s)", success: false });
  }

  const user = await User.findOne({ username });
  const otpTime = user.otpTime;

  if (Date.now() > otpTime) {
    return res.status(401).json({
      message: "OTP expired",
      success: false,
    });
  }

  if (await bcrypt.compare(otp.toString(), user.otp)) {
    user.otp = "";
    user.otpTime = 0;
    await user.save();

    return res.status(200).json({
      message: "OTP Verified",
      success: true,
    });
  }

  return res.status(200).json({
    message: "Invalid OTP",
    success: false,
  });
};

module.exports = { verifyOtp };
