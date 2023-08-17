const express = require("express");

const TagsRoutes = express.Router();
const TagsController = require("../controller/manageTags");
const tagsController = require("../controller/manageTags");
const validate = require("../middleware/validator");

TagsRoutes.post("/addTag", validate.addTagValidation(), validate.validate, TagsController.addTag);
TagsRoutes.get("/getalltags", tagsController.getAllTags);
TagsRoutes.delete("/deletetag/:id", validate.blogIdValidate(), validate.validate, TagsController.deleteTag);

module.exports = TagsRoutes;
