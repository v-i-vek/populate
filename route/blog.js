const express = require("express");

const blogRoutes = express.Router();
const auth = require("../middleware/auth");
const blogController = require("../controller/blog");

blogRoutes.get("/blog", auth.auth, blogController.blogs);

blogRoutes.get("/blog/:id", auth.auth, blogController.blog);

blogRoutes.get("/blogbyuser/:userId", auth.auth, blogController.getBlog);

blogRoutes.get("/blogtitle", blogController.getBlogTitle);

blogRoutes.post("/blog", auth.auth, blogController.createBlog);

blogRoutes.delete("/blog/:id", auth.auth, blogController.deleteBlog);

blogRoutes.patch("/blog/:id", auth.auth, blogController.updateBlog);

module.exports = blogRoutes;
