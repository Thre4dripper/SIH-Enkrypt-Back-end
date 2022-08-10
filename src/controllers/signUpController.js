const User = require("../models/user");

const bcrypt = require("bcrypt");

const signUpController = async (req, res) => {
  const { username, email, pass_image, category } = req.body;

  if (!username || !email || !pass_image || !category) {
    //bad request
    return res.status(400).json({
      message: "Empty Fields",
      isCreated: false,
    });
  }

  try {
    //encrypting pass_image
    let hashedImage = await bcrypt.hash(username, 10);
    hashedImage += pass_image.substring(pass_image.length - 1);

    const user = new User({
      username,
      email,
      pass_image: hashedImage,
      category,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", isCreated: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
      isCreated: false,
    });
  }
};

module.exports = { signUpController };
