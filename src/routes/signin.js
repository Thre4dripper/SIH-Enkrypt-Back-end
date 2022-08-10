const express = require("express");
const router = express.Router();

const { userCheck } = require("../controllers/userCheck");
const { imagePattern } = require('../controllers/loginController');
const { validateLogin } = require("../controllers/loginController");
const { validateUser } = require("../middlewares/auth");

router.post("/check", userCheck("signin"),imagePattern);
router.post("/", validateUser("signin"), validateLogin);

module.exports = router;
