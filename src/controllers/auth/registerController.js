const fsPromises = require("fs").promises;
const path = require("path");

const { registerUserWithImage } = require("../../controllers/modelController");

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
        path.join(__dirname, "..", "..", "models", "users.json"),
        "utf8"
      )
    );

    if (!usersArray.find((user) => user.username === username)) {
      //bad request
      return res.status(400).json({
        message: "User does not exist",
        isCreated: false,
      });
    }

    //inserting pass_image into DB
    await registerUserWithImage(usersArray, username, pass_image);

    //inserting data into DB
    await fsPromises.writeFile(
      path.join(__dirname, "..", "..", "models", "users.json"),
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

module.exports = registerController;
