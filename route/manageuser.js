const express = require("express");

const manageUsersRoutes = express.Router();
const manageUsersController = require("../controller/manageUser");
const validate = require("../middleware/validator");

manageUsersRoutes.get("/getusers", manageUsersController.getAllUsers);
manageUsersRoutes.delete("/deleteuser/:id", validate.blogIdValidate(), validate.validate, manageUsersController.deleteUser);

module.exports = manageUsersRoutes;
