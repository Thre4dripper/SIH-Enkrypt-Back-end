const fsPromises = require("fs").promises;
const path = require("path");

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
        path.join(__dirname, "..", "..", "models", "users.json"),
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
      path.join(__dirname, "..", "..", "models", "users.json"),
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

module.exports = signupController;
