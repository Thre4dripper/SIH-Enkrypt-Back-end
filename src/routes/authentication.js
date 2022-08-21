const express = require("express");
const router = express.Router();

const verifyJWT = require("../middlewares/verifyJWT");
router.post("/", verifyJWT);

module.exports = router;