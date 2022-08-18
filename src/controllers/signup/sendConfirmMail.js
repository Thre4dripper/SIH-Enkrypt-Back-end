require('dotenv').config();
const nodemailer = require("nodemailer");
const sendMailPromise = require("../../utils/sendMailPromise");
const sendConfirmMail = async (username,email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "ID Created Successfully",
        html: `
        <div style="margin: 0; padding: 0; font-family:'sans-serif';color:#6e6e6e;">
 <table border="0" cellpadding="0" cellspacing="0" width="100%">
  <tr>
   <td>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
     <tr>
      <td align="left" bgcolor="#fb6519" style="padding: 30px 0 30px 30px;color: #ffffff;font-weight: 700;font-size:24px;font-family: 'sans-serif';letter-spacing: 7px;">
       CONFIRMATION MAIL
      </td>
     </tr>
     <tr>
      <td bgcolor="#f2f2f2" style="padding: 40px 30px 40px 30px;">
        <!-- content area -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
             <tr>
               <td align="center" style="padding-bottom:20px;color: #04B45F;font-size:24px;font-weight:bolder;">
                Account Confirmed !
               </td>
              </tr>
            <tr>
   <td align="center">
    <img src="https://firebasestorage.googleapis.com/v0/b/enkrypt-4fbe3.appspot.com/o/WhatsApp%20Image%202022-08-06%20at%2011.43.46%20PM.jpeg?alt=media&token=f6f42729-3da4-448c-bcb9-3bcb0bbb3f2c">
   </td>
  </tr>
  <tr>
   <td style="padding-top:50px;">
    Hi,
   </td>
  </tr>
  <tr>
   <td style="padding-top:20px;">
    Welcome !
   </td>
  </tr>
  <tr>
   <td style="padding-top:20px;">
    Thank you for joining us ${username}.Your account is confirmed. You now have access to login.
   </td>
  </tr>
  <tr>
   <td style="padding-top:10px;">
     You may now sign in,
   </td>
  </tr>
   <tr>
   <td align="center" style="padding-top:20px;">
     <a href="#" style="padding: 10px 25px;background-color: #fb6519;color: #ffffff; border:none;border-radius:4px;display:block;width:200px;text-align:center;text-decoration:none;">Sign in</a>
   </td>
  </tr>     
   <tr>
   <td style="padding-top:20px;">
    If you have any questions or concerns please reach out to your dedicated Universum contact, or email us any time at <a href="#" style="color:#fb6519;">sih.enkrypt@gmail.com</a> if you have technical issues.
   </td>
  </tr>
  <tr>
   <td style="padding-top:20px;">
    Best Regards,
   </td>
  </tr>
  <tr>
   <td>
    Team Enkrypt
   </td>
  </tr>
 </table>
        <!-- content area ends  -->
      </td>
     </tr>
        <tr>
      <td bgcolor="#2A2F43" style="padding: 20px 10px ">
       <!-- footer area -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
       <tr>
        <td style="color:#ffffff;font-size:12px;">
         &copy; 2022 All Rights Reserved.
        </td>
        <td align="right">
          <table border="0" cellpadding="0" cellspacing="0">
  <tr>
   <td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td>
  </tr>
 </table>
        </td>
       </tr>
      </table>
       <!-- footer ends -->
      </td>
     </tr>
    </table>
   </td>
  </tr>
 </table>
</body>
        `
    }

    await sendMailPromise(transporter, mailOptions);
}

module.exports = sendConfirmMail