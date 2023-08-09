const express = require("express");

const searchRouter = new express.Router();
const searchController = require("../controller/search");

searchRouter.get("/search", searchController.searchQuestion);

module.exports = searchRouter;
