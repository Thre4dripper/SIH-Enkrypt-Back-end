const bcrypt = require("bcrypt");
const User = require("../../models/user");

const resetPass = async (req, res) => {
  const { username, category, pass_image } = req.body;

  if (!username || !category || !pass_image) {
    return res.status(400).json({
      message: "Empty fields",
      success: false,
    });
  }

  let hashedPass = await bcrypt.hash(username, 10);
  hashedPass += pass_image.substring(pass_image.length - 1);

  await User.findOneAndUpdate(
    { username },
    { pass_image: hashedPass, category: category.toString().toLowerCase() }
  );

  return res.status(200).json({
    message: "Pass Image updated",
    success: true,
  });
};

module.exports = resetPass;
