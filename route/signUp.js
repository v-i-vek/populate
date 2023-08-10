const express = require("express");

const router = express.Router();
const signinController = require("../controller/signUp");
const valid = require("../validaton/validator");

router.post("/signup", valid.userValidationRules(), valid.validate, signinController.signUp);

module.exports = router;
