const express = require("express");

const signinRoutes = express.Router();
const signinController = require("../controller/signIn");

signinRoutes.post("/signin", signinController.signIn);
signinRoutes.get("/userrole/:id", signinController.userRole);

module.exports = signinRoutes;
