const User = require("../models/user");

const validateUser = (type) => async (req, res, next) => {
  let { username } = req.body;

  if (!username) {
    //bad request
    return res.status(400).json({
      message: "Please provide username",
      isExist: true,
    });
  }

  username = username.toLowerCase();
  //lowercased request body username for subsequent requests
  req.body.username = username;

  try {
    const user = await User.findOne({ username }).exec();

    if (type === "signup") {
      //user must not exist when signing up
      if (!user) {
        next();
      } else {
        //conflict
        return res
          .status(409)
          .json({ message: "User already exist", isExist: true });
      }
    } else if (type === "signin") {
      //user must exist when signing in
      if (user) {
        next();
      }
      //conflict
      else {
        return res
          .status(409)
          .json({ message: "User doesn't exist", isExist: false });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
      isExist: true,
    });
  }
};

module.exports = { validateUser };
