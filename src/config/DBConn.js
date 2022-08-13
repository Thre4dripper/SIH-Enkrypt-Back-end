require("dotenv").config();

const mongoose = require("mongoose");

const mongoDB = process.env.REMOTE_DATABASE_URI;

const connectDB = () => {
  try {
    mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error.message);
  }

  return mongoose.connection;
};

module.exports = connectDB;
