const sendMailPromise = async (transporter, mailOptions) => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    }).catch((err) => {
      console.log(err);
    });
};
  
module.exports = sendMailPromise;