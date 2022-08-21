const express = require("express");
const router = express.Router();

const userCheck = require("../middlewares/userCheck");
const userRateLimiter = require("../middlewares/userRateLimiter");
const sessionRemover = require("../middlewares/sessionRemover");
const sendImagePattern = require("../controllers/login/sendImagePattern");
const validateUser = require("../middlewares/auth");
const validateLogin = require("../controllers/login/validateLogin");

router.post(
    "/check",
    userCheck("signin"),
    userRateLimiter,
    sessionRemover,
    sendImagePattern
);
router.post("/", validateUser("signin"), validateLogin);

module.exports = router;
