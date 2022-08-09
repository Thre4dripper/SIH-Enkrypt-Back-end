const fsPromises = require("fs").promises;
const path = require("path");
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
    const usersArray = JSON.parse(
      await fsPromises.readFile(
        path.join(__dirname, "..", "models", "users.json"),
        "utf8"
      )
    );

    //encrypting pass_image
    let hashedImage = await bcrypt.hash(username, 10);
    hashedImage += pass_image.substring(pass_image.length - 1);

    //inserting data into array
    usersArray.push({
      username,
      email,
      pass_image: hashedImage,
      category,
      pattern: "",
    });

    //writing data into DB
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersArray)
    );

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
