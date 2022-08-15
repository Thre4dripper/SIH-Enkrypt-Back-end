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
      message: "otp expired",
      success: false,
    });
  }

  if (await bcrypt.compare(otp.toString(), user.otp)) {
    //resetting otpTime and otp after successful top verification
    user.otp = "";
    user.otpTime = 0;
    await user.save();

    return res.status(200).json({
      message: "otp Verified",
      success: true,
    });
  }

  //unauthorized
  return res.status(401).json({
    message: "Invalid otp",
    success: false,
  });
};

module.exports = { verifyOtp };
