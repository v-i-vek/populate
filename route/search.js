const express = require("express");

const searchRouter = new express.Router();
const searchController = require("../controller/search");
const validate = require("../middleware/validator");

searchRouter.get("/search", validate.searchValidation(), validate.validate, searchController.searchQuestion);

module.exports = searchRouter;
