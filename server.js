require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;

//mongoose connection
const mongoose = require("mongoose");
const DATABASE_URI = process.env.DATABASE_URI;

//rate limiter middleware
const rateLimiter = require("./src/middlewares/ipRateLimiter");

mongoose.connect(DATABASE_URI, { useNewUrlParser: true });
const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", rateLimiter, require("./src/routes/signUp"));
app.use("/signin", rateLimiter, require("./src/routes/signIn"));

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).on("error", (err) => {
  console.log(err);
});
