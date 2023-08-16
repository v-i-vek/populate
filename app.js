const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const { logFun } = require("./logger/logger");

const app = express();
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

const info = "info";
const error = "error";
let status = "connected to ";
const corsOptions = {
    origin: "http://localhost:4200",
    methods: ["GET", "PATCH", "POST", "DELETE"],
    withCredentials: true,
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
};

const allowCrossDomain = (req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "http://localhost:4200",
    );
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
};
app.use(allowCrossDomain);
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // logger.log("info", "Connected to database");
        status += "database";
        logFun(info, status);
        
    } catch (err) {
        // logger.log("error", err);
        logFun(error, err);
    }
};
connectToDatabase();
app.use(cors(corsOptions));
app.options(
    "*",
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    }),
);
app.use("/", signupRoutes);

app.use("/forgotpassword", forgotpasswordRoutes);

app.use(
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

app.use("/admin", manageUsersRoutes, tagsRoutes, manageResourcesRoutes);
app.listen(8080, () => {
    status += "port";
    logFun(info, status);
    status = "connected to ";
});

// exports.techForumAPIs = app;
module.exports = app;
