const express = require("express");

const forgotpasswordRoutes = express.Router();
const forgotpasswordController = require("../controller/forgetPassword");

const validate = require("../middleware/validator");

forgotpasswordRoutes.post("/", validate.forgotPasswordValidation(), validate.validate, forgotpasswordController.forgotPassword);
forgotpasswordRoutes.post(
    "/reset-password",
    forgotpasswordController.resetPassword,
);

module.exports = forgotpasswordRoutes;
