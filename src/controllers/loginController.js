const fsPromises = require("fs").promises;
const path = require("path");

const randomBinary = require("../utils/randomBinary");
const generatePattern = require("../utils/generatePattern");

const imagePattern = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ message: "username not found", success: false });
  }

  const usersArray = JSON.parse(
    await fsPromises.readFile(
      path.join(__dirname, "..", "models", "users.json"),
      "utf8"
    )
  );
  const user = usersArray.find((user) => user.username === username);
  const { category, pass_image } = user;
  const time = new Date().getTime() + 5 * 60 * 1000;

  //getting pattern value
  const pattern = randomBinary("");

  //generating image pattern to be sent to client
  const patternArray = generatePattern(pattern, 5, pass_image);

  //writing generated pattern to user's data
  pattern += ":" + time;
  user.pattern = pattern;

  //writing data into DB
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "users.json"),
    JSON.stringify(usersArray)
  );

  return res.status(200).json({
    message: "pattern generated",
    isExist: true,
    pattern: patternArray,
    category,
  });
};

const validateLogin = async (req, res) => {
  const { username, pattern } = req.body;
};

module.exports = { imagePattern, validateLogin };
