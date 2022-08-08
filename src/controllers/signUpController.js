const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  const { username, email, category } = req.body;

  if (!username || !email || !category) {
    //bad request
    return res.status(400).json({
      message: "Please provide username and password",
      isExist: true,
    });
  }

  try {
    const usersArray = JSON.parse(
      await fsPromises.readFile(
        path.join(__dirname, "..", "models", "users.json"),
        "utf8"
      )
    );

    // Check if user already exists
    if (usersArray.find((user) => user.username === username)) {
      //conflict
      return res.status(409).json({
        message: "Username already exists",
        isExist: true,
      });
    }

    //inserting new user
    usersArray.push({
      username,
      email,
      pass_image: "",
      category,
      pattern: "",
    });

    // inserting data into DB
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersArray)
    );

    return res
      .status(201)
      .json({ message: "User created successfully", isExist: false });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
      isExist: true,
    });
  }
};

const registerController = async (req, res) => {
  const { username, pass_image } = req.body;

  if (!username || !pass_image) {
    //bad request
    return res.status(400).json({
      message: "Please provide password image",
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

    if (!usersArray.find((user) => user.username === username)) {
      //conflict
      return res.status(409).json({
        message: "User does not exist",
        isCreated: false,
      });
    }

    //inserting pass_image into DB
    let hashedImage = await bcrypt.hash(username, 10);

    //encrypting password
    hashedImage += pass_image.substring(pass_image.length - 1);

    const user = usersArray.find((user) => user.username === username);
    user.pass_image = hashedImage;

    //inserting data into DB
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(usersArray)
    );

    //successful registration
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

module.exports = { signupController, registerController };
