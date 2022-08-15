const bcrypt = require("bcrypt");
const User = require("../../models/user");

/**==================================== FUNCTION FOR RESETTING USER PASS IMAGE ===========================================**/
const resetPass = async (req, res) => {
  const { username, category, pass_image } = req.body;

  if (!username || !category || !pass_image) {
    return res.status(400).json({
      message: "Empty fields",
      success: false,
    });
  }

  //again encrypting pass_image
  const imageNumber = pass_image.substring(pass_image.indexOf("_")+1);
  const hashedImage = await bcrypt.hash(imageNumber, 10);

  await User.findOneAndUpdate(
    { username },
    { pass_image: hashedImage, category: category.toString().toLowerCase() }
  );

  return res.status(200).json({
    message: "Pass Image updated",
    success: true,
  });
};

module.exports = resetPass;
