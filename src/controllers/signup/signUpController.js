const User = require("../../models/user");

const bcrypt = require("bcrypt");
const sendConfirmMail = require("./sendConfirmMail");

const signUpController = async (req, res) => {
    const { username, email, pass_image, category } = req.body;

    if (!username || !email || !pass_image || !category) {
        //bad request
        return res.status(400).json({
            message: "Empty Fields",
            isCreated: false,
        });
    }

    try {
        //encrypting pass_image subsequence

        let hashedImage = "";
        for (let i = 0; i < pass_image.length; i++) {
            hashedImage += await bcrypt.hash(pass_image[i], 10);
            if (i !== pass_image.length - 1)
                hashedImage += "-";
        }

        const user = new User({
            username,
            email,
            pass_image: hashedImage,
            category: category.toLowerCase(),
        });

        await user.save();

        //sending otp to user's email
        //await sendConfirmMail(username, email);

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