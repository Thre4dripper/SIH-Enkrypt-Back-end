const fsPromises = require("fs").promises;
const path = require("path");

const userCheck = (type) => async (req, res,next) => {
  const { username } = req.body;

  if (!username) {
    //bad request
    return res.status(400).json({
      message: "Please provide username",
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

    const user = usersArray.find((user) => user.username === username);

    if (type === "signup") {
      //user must not exist when signing up
      if (user)
        //conflict
        return res
          .status(409)
          .json({ message: "User already exist", isExist: true });
      else
        return res
          .status(200)
          .json({ message: "User doesn't exist", isExist: false });
    } else if (type === "signin") {
      //user must exist when signing in
      if (user)
        next();
      //conflict
      else
        return res
          .status(409)
          .json({ message: "User doesn't exist", isExist: false });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
      isExist: true,
    });
  }
};

module.exports = { userCheck };
