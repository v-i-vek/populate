const express = require("express");

const blogRoutes = express.Router();
const auth = require("../middleware/auth");
const blogController = require("../controller/blog");
const validate = require("../middleware/validator");

blogRoutes.get("/blog", validate.blogValidatePost().validate.validate, auth.auth, blogController.blogs);

blogRoutes.get("/blog/:id", validate.answerValidateGetById(), validate.validate, auth.auth, blogController.blog);

blogRoutes.get("/blogbyuser/:userId", validate.blogIdValidate().validate.validate, auth.auth, blogController.getBlog);

blogRoutes.get("/blogtitle", blogController.getBlogTitle);

blogRoutes.post("/blog", validate.blogValidatePost(), validate.validate, auth.auth, blogController.createBlog);

blogRoutes.delete("/blog/:id", validate.answerValidateGetById(), validate.validate, auth.auth, blogController.deleteBlog);

blogRoutes.patch("/blog/:id", validate.answerValidateGetById(), validate.validate, auth.auth, blogController.updateBlog);

module.exports = blogRoutes;
