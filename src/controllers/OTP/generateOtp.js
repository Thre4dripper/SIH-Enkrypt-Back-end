require("dotenv").config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { OTP_EXPIRY_TIME } = require("../../config/Constants");
const User = require("../../models/user");
const sendMailPromise = require("../../utils/sendMailPromise");

const generateOtp = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send({
      message: "Username is required",
    });
  }

  const user = await User.findOne({ username });

  const otp = Math.floor(Math.random() * 1000000);

  try {
    //sending OTP to user's email
    await clientSendOTP(user, otp);

    //saving OTP in database
    await dbSaveOTP(user, otp);

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

const dbSaveOTP = async (user, otp) => {
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  user.otp = hashedOtp;
  user.otpTime = Date.now() + OTP_EXPIRY_TIME;
  await user.save();
};

const clientSendOTP = async (user, otp) => {
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

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: user.email,
    subject: "Enkrypt Password Reset",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${brand}</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing ${brand}. Use the following OTP to reset your pass image. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />${brand}</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>${brand} Inc</p>
          <p>Jamia Millia Islamia</p>
          <p>New Delhi</p>
        </div>
      </div>
    </div>`,
  };

  return await sendMailPromise(transporter, mailOptions);
};


module.exports = { generateOtp };
