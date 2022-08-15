const express = require("express");
const router = express.Router();

const {userCheck} = require("../middlewares/userCheck");
const {sendImagePattern} = require("../controllers/login/sendImagePattern");
const {validateLogin} = require("../controllers/login/validateLogin");
const {validateUser} = require("../middlewares/auth");
const {sessionRemover} = require("../middlewares/sessionRemover");
const userRateLimiter = require("../middlewares/userRateLimiter");

router.post(
    "/check",
    userCheck("signin"),
    userRateLimiter,
    sessionRemover,
    sendImagePattern
);
router.post("/", validateUser("signin"), validateLogin);

module.exports = router;
