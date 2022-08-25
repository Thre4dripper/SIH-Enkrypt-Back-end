const User = require("../../models/user");

const bcrypt = require("bcrypt");
const sendConfirmMail = require("./sendConfirmMail");

const signUpController = async (req, res) => {
    const { username, profEmail, personalEmail, phoneNumber, pass_image, category } = req.body;

    if (!username || !profEmail || !personalEmail || !phoneNumber || !pass_image || !category) {
        //bad request
        return res.status(400).json({
            message: "Empty Fields",
            isCreated: false,
        });
    }

    try {
        //encrypting pass_image
        const imageNumber = pass_image.substring(pass_image.indexOf("_") + 1);
        const hashedImage = await bcrypt.hash(imageNumber, 10);

        const user = new User({
            username,
            prof_email: profEmail,
            personal_email: personalEmail,
            phone_number: phoneNumber,
            pass_image: hashedImage,
            category: category.toLowerCase(),
        });

        await user.save();

        //sending otp to user's email
        await sendConfirmMail(username, profEmail);

        return res
            .status(201)
            .json({ message: "User registered successfully", isCreated: true });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong",
            isCreated: false,
        });
    }
};

module.exports = signUpController;