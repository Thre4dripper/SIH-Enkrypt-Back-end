const express = require("express");
const router = express.Router();

const { userCheck } = require("../middlewares/userCheck");
const { imagePattern } = require("../controllers/login/loginController");
const { validateLogin } = require("../controllers/login/loginController");
const { validateUser } = require("../middlewares/auth");
const { sessionRemover } = require("../middlewares/sessionRemover");
const userRateLimiter = require("../middlewares/userRateLimiter");

router.post(
  "/check",
  userCheck("signin"),
  userRateLimiter,
  sessionRemover,
  imagePattern
);
router.post("/", validateUser("signin"), validateLogin);

module.exports = router;
