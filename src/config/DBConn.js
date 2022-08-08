require("dotenv").config();

const mongoose = require("mongoose");

const mongoDB = process.env.DATABASE_URI;
const connectDB = () => {
  try {
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
