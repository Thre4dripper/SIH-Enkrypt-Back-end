const User = require("../models/user");

const { randomBinary } = require("../utils/utils");
const generateImagesPattern = require("../utils/generatePattern");
const { CATS_COUNT, DOGS_COUNT } = require("../config/Constants");

/** =========================== FUNCTION FOR CREATING AND STORING LOGIN PATTERN  ==============================*/
const createLoginPattern = async (init, user) => {
  let pattern = user.pattern;

  pattern = pattern.split(":")[0];

  //randomBinary function is used to generate pattern

  /*
  IT WILL RETURN PATTERN WITH LENGTH OF 5 WHEN PATTERN IS EMPTY
  IT WILL RETURN PATTERN WITH LENGTH INCREASED BY 1 WHEN PATTERN IS NOT EMPTY
  */
  if (init) {
    pattern = randomBinary("");
  } else {
    pattern = randomBinary(pattern);
  }

  //writing generated pattern to user's data along with timestamp
  pattern += ":" + (new Date().getTime() + 60 * 1000);
  user.pattern = pattern;

  await user.save();
};

/** =========================== FUNCTION FOR CLEARING PATTERN FROM DATABASE ==============================*/
const clearPattern = async (user) => {
  user.pattern = "";
  await user.save();
};

/** =========================== FUNCTION FOR SENDING RANDOM IMAGE PATTERN TO CLIENT ==============================*/
const imagePattern = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ message: "username not found", success: false });
  }

  const user = await User.findOne({ username }).exec();

  //firstly creating login pattern to be stored in DB
  await createLoginPattern(true, user);

  let { pattern, category, pass_image } = user;

  //getting pass_image value and login pattern value
  pass_image = pass_image.substring(pass_image.length - 1);
  pattern = pattern.split(":")[0];

  let categorySize;

  switch (category) {
    case "Cat":
      categorySize = CATS_COUNT;
      break;
    case "Dog":
      categorySize = DOGS_COUNT;
      break;
    default:
      categorySize = 0;
  }

  //generating image pattern to be sent to client
  const imagesPattern = generateImagesPattern(
    pattern,
    categorySize,
    pass_image
  );

  return res.status(200).json({
    message: "pattern generated",
    isExist: true,
    pattern: imagesPattern,
    category,
  });
};

/** =========================== FUNCTION FOR FINAL VALIDATION OF USER BY PATTERN  ==============================*/
const validateLogin = async (req, res) => {
  const { username, pattern, timestamp } = req.body;

  if (!username || !pattern || !timestamp) {
    return res.status(400).json({ message: "Empty Field(s)", success: false });
  }

  try {
    const user = await User.findOne({ username }).exec();
    const dbPattern = user.pattern.split(":")[0];
    const dbTimestamp = +user.pattern.split(":")[1];

    //checking validity of pattern by timestamp
    if (timestamp > dbTimestamp) {
      //clearing pattern from user's data
      await clearPattern(user);

      return res.status(401).json({
        message: "Pattern expired",
        success: false,
      });
    }

    //comparing pattern
    if (dbPattern === pattern) {
      //clearing pattern from user's data
      await clearPattern(user);

      //returning success message
      return res.status(200).json({
        message: "pattern validated",
        success: true,
      });
    } else {
      //for every wrong attemp, pattern is reset and increased by 1
      await createLoginPattern(false, user);

      //returning failure message
      return res.status(401).json({
        message: "pattern not validated",
        success: false,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = { imagePattern, validateLogin };
