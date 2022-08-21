const User = require("../models/user");

const checkOtp = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).send({
            message: "Username is required",
        });
    }

    const user = await User.findOne({ username });

    if (user.otp.length !== 0 && user.otpTime > Date.now()) {
        return res.status(200).json({
            message: "Please enter Previous otp or wait for 5 minutes",
            success: false,
        });
    }

    next();
};

module.exports = checkOtp;