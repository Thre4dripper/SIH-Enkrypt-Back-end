require("dotenv").config();
const nodemailer = require("nodemailer");
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
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
    const professionalOtp = Math.floor(Math.random() * 100).toString().padStart(2, "0");
    const personalOtp = Math.floor(Math.random() * 100).toString().padStart(2, "0");
    const smsOtp = Math.floor(Math.random() * 100).toString().padStart(2, "0");
    const otp = professionalOtp + personalOtp + smsOtp;

    try {
        //sending otp to user's email
        await Promise.all(
            [
                sendOtpMail(user, "professional", professionalOtp),
                sendOtpMail(user, "personal", personalOtp),
                sendSmsOtp(user, smsOtp)
            ]
        );

        //saving otp in database
        await dbSaveOTP(user, otp);

        const maskedProfEmail =
            user.prof_email.substring(0, 3) +
            "****" +
            user.prof_email.substring(user.prof_email.indexOf("@") - 1);

        const maskedPersonalEmail =
            user.personal_email.substring(0, 3) +
            "****" +
            user.personal_email.substring(user.personal_email.indexOf("@") - 1);

        const maskedPhoneNumber = user.phone_number.substring(0, 3) + "****" + user.phone_number.substring(user.phone_number.length - 3);

        //success
        res.status(200).json({
            message: `OTP sent successfully to ${user.username}'s registered emails and phone number`,
            professionalEmail: maskedProfEmail,
            personalEmail: maskedPersonalEmail,
            phoneNumber: maskedPhoneNumber,
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
const sendOtpMail = async (user, type, otp) => {
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
        to: type === "professional" ? user.prof_email : user.personal_email,
        subject: "Enkrypt Password Reset",
        html: html.replace("${otp}", otp).replace("${brand}", brand),
    };

    //sending mail
    return await sendMailPromise(transporter, mailOptions);
};

const sendSmsOtp = async (user, otp) => {
    client.messages
        .create({
            body: 'Your OTP is ' + otp,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone_number
        })
        .then(message => console.log(message.sid));
}


module.exports = { generateOtp };
