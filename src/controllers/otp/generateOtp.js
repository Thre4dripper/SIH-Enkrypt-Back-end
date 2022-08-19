require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");
const { OTP_EXPIRY_TIME } = require("../../config/Constants");
const User = require("../../models/user");
const sendMailPromise = require("../../utils/sendMailPromise");

/**====================== FUNCTION FOR GENERATING,SENDING AND SAVING OTP ========================**/
const generateOtp = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        //bad request
        return res.status(400).send({
            message: "Username is required",
        });
    }

    const user = await User.findOne({ username });

    //generating 6 digit otp
    const otp = Math.floor(Math.random() * 1000000);
    const newOtp = otp.toString().padEnd(6, "0");

    try {
        //sending otp to user's email
        await clientSendOTP(user, newOtp);

        //saving otp in database
        await dbSaveOTP(user, newOtp);

        const maskedEmail =
            user.email.substring(0, 3) +
            "****" +
            user.email.substring(user.email.indexOf("@") - 1);

        //success
        res.status(200).json({
            message: `OTP sent successfully to ${user.username}'s registered email`,
            email: maskedEmail,
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Something went wrong",
        });
    }
};

/**=========================== FUNCTION FOR SAVING OTP IN DATABASE ==================================**/
const dbSaveOTP = async (user, otp) => {
    user.otp = await bcrypt.hash(otp.toString(), 10);
    user.otpTime = Date.now() + OTP_EXPIRY_TIME;
    await user.save();
};

/**=========================== FUNCTION FOR SENDING OTP TO CLIENT ==================================**/
const clientSendOTP = async (user, otp) => {
    //getting html template
    const html = await fsPromises.readFile(path.join(__dirname, "..", "..", "views", "otpMail.html"), "utf8");
    //creating transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
        host: "smtp.gmail.com",
        port: 465,
    });

    const brand = "Enkrypt";

    //creating mail options
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: user.email,
        subject: "Enkrypt Password Reset",
        html: html.replace("${otp}", otp).replace("${brand}", brand),
    };

    //sending mail
    return await sendMailPromise(transporter, mailOptions);
};


module.exports = { generateOtp };
