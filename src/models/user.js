const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  pass_image: { type: String, default: "" },
  category: String,
  pattern: { type: String, default: "" },
  timestamp: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
