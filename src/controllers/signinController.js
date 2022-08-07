const fsPromises = require("fs").promises;
const path = require("path");

const signinController = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({
      message: "Please provide username",
    });
  }

  try {
    const usersArray = JSON.parse(
      await fsPromises.readFile(
        path.join(__dirname, "..", "models", "users.json"),
        "utf8"
      )
    );

    const user = usersArray.find((user) => user.username === username);
    if (!user) {
      return res.status(400).json({
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

module.exports = signinController;
