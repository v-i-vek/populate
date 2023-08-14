const express = require("express");

const signinRoutes = express.Router();
const signinController = require("../controller/signIn");
const valid = require("../middleware/validator");

signinRoutes.post("/signin", valid.signInValidation(), valid.validate, signinController.signIn);
signinRoutes.get("/userrole/:id", signinController.userRole);

module.exports = signinRoutes;
