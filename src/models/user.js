const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
    loginId: { type: String, default: "" },
    pattern: { type: String, default: "" },
    patternTime: { type: Number, default: 0 },
});

const userSchema = new Schema({
    username: { type: String, required: true },
    prof_email: { type: String, required: true },
    personal_email: { type: String, required: true },
    phone_number: { type: String, required: true },
    pass_image: { type: String, default: "" },
    category: { type: String, required: true },
    sessions: {
        type: [sessionSchema],
        default: [],
    },
    otp: { type: String, default: "" },
    otpTime: { type: Number, default: 0 },
    lastLogin: { type: Number, default: 0 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
