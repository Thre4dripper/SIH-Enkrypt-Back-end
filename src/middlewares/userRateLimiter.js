require('dotenv').config();
const nodemailer = require("nodemailer");
const fsPromises = require("fs").promises;
const path = require("path");
const moment = require("moment");

const { USER_RATE_LIMIT_MAX, USER_RATE_LIMIT_WINDOW } = require("../config/Constants");
const User = require("../models/user");
const sendMailPromise = require("../utils/sendMailPromise");

const userRateLimiter = async (req, res, next) => {
    const { username } = req.body;

    if (!username) {
        //bad request
        return res
            .status(400)
            .json({ message: "username not found", success: false });
    }

    const user = await User.findOne({ username });
    const attempts = user.__v;
    const lastLogin = user.lastLogin + USER_RATE_LIMIT_WINDOW;
    const timestamp = Date.now();

    if (attempts >= USER_RATE_LIMIT_MAX && timestamp < lastLogin) {
        await sendWarningMail(timestamp, user.prof_email);
        return res
            .status(401)
            .json({ message: "too many attempts", success: false });
    }

    //reset attempts and lastLogin
    if (attempts >= USER_RATE_LIMIT_MAX && timestamp > lastLogin) {
        user.__v = 0;

        //it will be filled in createLoginPattern method
        user.lastLogin = 0;
    }

    await user.save();

    next();
};

/**===================================== FUNCTION FOR SENDING WARNING MAIL ======================================**/
const sendWarningMail = async (timestamp, email) => {
    //getting html template
    const html = await fsPromises.readFile(path.join(__dirname, "..", "views", "warningMail.html"), "utf8");
    //creating transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    moment.locale("en");
    const date = moment(timestamp).format("LLLL");

    //creating mail options
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Warning",
        html: html.replace("${lastLoginAttempt}", date.toString())
    }
    //sending mail
    await sendMailPromise(transporter, mailOptions);
}

module.exports = userRateLimiter;
