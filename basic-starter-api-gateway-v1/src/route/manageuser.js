const express = require("express");

const manageUsersRoutes = express.Router();
const manageUsersController = require("../controller/manageUser");

manageUsersRoutes.get("/getusers", manageUsersController.getAllUsers);
manageUsersRoutes.delete("/deleteuser/:id", manageUsersController.deleteUser);

module.exports = manageUsersRoutes;
