const express = require("express");

const TagsRoutes = express.Router();
const TagsController = require("../controller/manageTags");
const tagsController = require("../controller/manageTags");

TagsRoutes.post("/addTag", TagsController.addTag);
TagsRoutes.get("/getalltags", tagsController.getAllTags);
TagsRoutes.delete("/deletetag/:id", TagsController.deleteTag);

module.exports = TagsRoutes;
