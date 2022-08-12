const { USER_RATE_LIMIT_MAX } = require("../config/Constants");
const User = require("../models/user");

const userRateLimiter = async (req, res, next) => {
  const { username, timestamp } = req.body;

  if (!username || !timestamp) {
    //bad request
    return res
      .status(400)
      .json({ message: "username, timestamp not found", success: false });
  }

  const user = await User.findOne({ username });
  const attempts = user.__v;
  const lastLogin = user.lastLogin;

  if (attempts >= USER_RATE_LIMIT_MAX && timestamp < lastLogin) {
    return res
      .status(401)
      .json({ message: "too many attempts", success: false });
  }

  //reset attempts and lastLogin
  if (attempts >= USER_RATE_LIMIT_MAX && timestamp > lastLogin) {
    user.__v = 0;

    //it will be filled in createLoginPattern method
    user.lastLogin = 0;
  }

  await user.save();

  next();
};

module.exports = userRateLimiter;
