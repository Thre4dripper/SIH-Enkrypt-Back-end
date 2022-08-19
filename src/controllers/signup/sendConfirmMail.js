require('dotenv').config();
const nodemailer = require("nodemailer");
const fsPromises = require("fs").promises;
const path = require("path");
const sendMailPromise = require("../../utils/sendMailPromise");

/**============================ FUNCTION FOR SENDING CONFIRMATION MAIL OF ID CREATED ==================================**/
const sendConfirmMail = async (username, email) => {
    //getting html template
    const html = await fsPromises.readFile(path.join(__dirname, "..", "..", "views", "confirmationMail.html"), "utf8");
    //creating transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });
    //creating mail options
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "ID Created Successfully",
        html:html.replace("${username}", username)
    }

    //sending mail
    await sendMailPromise(transporter, mailOptions);
}

module.exports = sendConfirmMail