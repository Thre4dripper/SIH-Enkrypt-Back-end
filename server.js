require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

const ipRateLimiter = require("./src/middlewares/ipRateLimiter");
const connectDB = require("./src/config/DBConn");

const db = connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", ipRateLimiter, require("./src/routes/signUp"));
app.use("/signin", ipRateLimiter, require("./src/routes/signIn"));
app.use("/otp", ipRateLimiter, require("./src/routes/otp"));
app.use("/contactus", ipRateLimiter, require("./src/routes/contactUs"));

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).on("error", (err) => {
  console.log(err);
});
