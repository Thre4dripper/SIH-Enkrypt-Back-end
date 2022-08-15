require("dotenv").config();
const nodeMailer = require("nodemailer");

const sendMailPromise = require("../../utils/sendMailPromise");

const contactUsController = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please fill all the fields",
      success: false,
    });
  }

  try {
    await creatMail(name, email, message);
    res.status(200).json({
      message: "Message sent successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const creatMail = (name, email, message) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    host: "smtp.gmail.com",
    port: 465,
  });

  const mailOption = {
    from: email,
    to: process.env.NODEMAILER_USER,
    subject: "Contact Us",
    html: `<div>
        <h1>Someone has contacted us</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        </div>`,
  };

  return sendMailPromise(transporter, mailOption);
};

module.exports = contactUsController;
