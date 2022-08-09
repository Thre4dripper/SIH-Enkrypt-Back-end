const express = require("express");
const router = express.Router();

const { loginController } = require("../controllers/loginController");
const { userCheck } = require("../controllers/userCheck");
const { validateUser } = require("../middlewares/auth");

router.post("/check", userCheck("signin"));
router.post("/", validateUser("signin"), loginController);

module.exports = router;
