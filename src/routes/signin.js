const express = require("express");
const router = express.Router();

const { loginController } = require("../controllers/loginController");
const { checkUser } = require("../controllers/UserCheck");

router.post("/check", checkUser("signin"));
router.post("/signin", loginController);

module.exports = router;
