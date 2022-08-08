require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", require("./src/routes/signUp"));
app.use("/signin", require("./src/routes/signIn"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
