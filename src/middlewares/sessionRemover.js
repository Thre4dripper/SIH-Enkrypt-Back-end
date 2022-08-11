const User = require("../models/user");

const sessionRemover = async (req, res, next) => {
  const { username, loginId, timestamp } = req.body;

  if (!username || !loginId || !timestamp) {
    //bad request
    return res.status(400).json({
      message: "username, loginId, timestamp not found",
      success: false,
    });
  }

  const user = await User.findOne({ username }).exec();

  //clearing dead sessions from user's data
  user.sessions.forEach((session, index) => {
    if (session.patternTime < timestamp) {
      user.sessions.splice(index, 1);
    }
  });

  await user.save();

  next();
};

module.exports = { sessionRemover };
