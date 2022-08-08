const fsPromises = require("fs").promises;
const path = require("path");

const loginController = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Please provide username",
    });
  }

  try {
    const usersArray = JSON.parse(
      await fsPromises.readFile(
        path.join(__dirname, "..", "..", "models", "users.json"),
        "utf8"
      )
    );

    const user = usersArray.find((user) => user.username === username);
    if (!user) {
      //forbidden
      return res.status(403).json({
        message: "Username does not exist",
      });
    }

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = loginController;
