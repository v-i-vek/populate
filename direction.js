const express = require("express");

const route = express();

const signinRoutes = require("./route/signIn");
const bookmarkRoutes = require("./route/bookmark");
const signupRoutes = require("./route/signUp");
const signoutRoutes = require("./route/signOut");
const forgotpasswordRoutes = require("./route/forgetPassword");
const serchRoutes = require("./route/search");
const questionRoutes = require("./route/question");
const blogRoutes = require("./route/blog");
const documentRoutes = require("./route/doc");
const answerRoutes = require("./route/answer");
const manageUsersRoutes = require("./route/manageuser");
const tagsRoutes = require("./route/Managetag");
const manageResourcesRoutes = require("./route/manageResource");

route.use("/", signupRoutes);

route.use("/forgotpassword", forgotpasswordRoutes);

route.use(
    "/users",
    signoutRoutes,
    signinRoutes,
    bookmarkRoutes,
    questionRoutes,
    serchRoutes,
    blogRoutes,
    documentRoutes,
    answerRoutes,
    tagsRoutes,
);

route.use("/admin", manageUsersRoutes, tagsRoutes, manageResourcesRoutes);

module.exports = route;
