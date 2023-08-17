const express = require("express");

const manageResourcesRoutes = express.Router();
const manageResourcesController = require("../controller/manageResource");
const validate = require("../middleware/validator");

manageResourcesRoutes.patch(
    "/approveblog/:id",
    validate.blogIdValidate(),
    validate.validate,
    manageResourcesController.approveBlog,
);
manageResourcesRoutes.patch(
    "/approvedoc/:id",
    validate.blogIdValidate(),
    validate.validate,
    manageResourcesController.approveDocument,
);

manageResourcesRoutes.get("/blog", manageResourcesController.blogs);

manageResourcesRoutes.get("/document", manageResourcesController.getDocument);

module.exports = manageResourcesRoutes;
