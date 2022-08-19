const bcrypt = require("bcrypt");
const User = require("../../models/user");

/**==================================== FUNCTION FOR RESETTING USER PASS IMAGE ===========================================**/
const resetPass = async (req, res) => {
    const { username, category, pass_image, otp } = req.body;

    if (!username || !category || !pass_image || !otp) {
        return res.status(400).json({
            message: "Empty fields",
            success: false,
        });
    }

    const user = await User.findOne({ username: username });
    if (!await bcrypt.compare(otp.toString(), user.otp)) {
        //unauthorized
        return res.status(401).json({
            message: "UnAuthorized",
            success: false,
        });
    }

    //again encrypting pass_image
    const imageNumber = pass_image.substring(pass_image.indexOf("_") + 1);
    const hashedImage = await bcrypt.hash(imageNumber, 10);

    //updating user object
    user.otp = "";
    user.otpTime = 0;
    user.pass_image = hashedImage;
    user.category = category.toString().toLowerCase();
    await user.save();

    return res.status(200).json({
        message: "Pass Image updated",
        success: true,
    });
};

module.exports = resetPass;
