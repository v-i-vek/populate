const express = require("express");

const router = express.Router();
const signinController = require("../controller/signUp");

router.post("/signup", signinController.signUp);

module.exports = router;
