const express = require("express");
const router = express.Router();

const { userCheck } = require("../controllers/userCheck");
const { imagePattern } = require("../controllers/loginController");
const { validateLogin } = require("../controllers/loginController");
const { validateUser } = require("../middlewares/auth");
const { sessionRemover } = require("../middlewares/sessionRemover");

router.post("/check", userCheck("signin"), sessionRemover, imagePattern);
router.post("/", validateUser("signin"), sessionRemover, validateLogin);

module.exports = router;
