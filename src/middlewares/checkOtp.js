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
            professionalEmail: user.prof_email.substring(0, 3) +
                "****" +
                user.prof_email.substring(user.prof_email.indexOf("@") - 1),
            personalEmail: user.personal_email.substring(0, 3) +
                "****" +
                user.personal_email.substring(user.personal_email.indexOf("@") - 1),
            phoneNumber: user.phone_number.substring(0, 3) + "****" + user.phone_number.substring(user.phone_number.length - 3),
            success: false,
        });
    }

    next();
};

module.exports = checkOtp;