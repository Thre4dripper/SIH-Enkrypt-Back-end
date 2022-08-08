const bcrypt = require("bcrypt");

const createNewUser = async (usersArray, username, email, category) => {
  usersArray.push({
    username,
    email,
    pass_image: "",
    category,
    pattern: "",
  });

  return usersArray;
};

const registerUserWithImage = async (usersArray, username, pass_image) => {
  let hashedImage = await bcrypt.hash(username, 10);

  //encrypting password
  hashedImage += pass_image.substring(pass_image.length - 1);

  const user = usersArray.find((user) => user.username === username);

  user.pass_image = hashedImage;
};

module.exports = { createNewUser, registerUserWithImage };
