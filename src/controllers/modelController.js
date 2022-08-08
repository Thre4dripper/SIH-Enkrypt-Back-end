const bcrypt = require("bcrypt");

const createNewUser = async (usersArray, username, email, category) => {
  let hashedPassImage = await bcrypt.hash(username, 10);
  usersArray.push({
    username,
    email,
    pass_image: hashedPassImage,
    category,
    pattern: "",
  });

  return usersArray;
};

module.exports = {createNewUser};