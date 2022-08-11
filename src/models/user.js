const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  loginId: { type: String, default: "" },
  pattern: { type: String, default: "" },
  patternTime: { type: Number, default: 0 },
  // rateLimit: { type: Number, default: 20 },
  // rateLimitTime: { type: Number, default: 0 },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  pass_image: { type: String, default: "" },
  category: { type: String, required: true },
  sessions: {
    type: [sessionSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
