const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const cors = require("cors");
const { logFun, info } = require("./logger/logger");
const { connectToDatabase } = require("./config");
const { routers } = require("./routers");
const router = require("./route/signUp");

const app = express();

// const corsOptions = {
//     origin: "http://localhost:4200",
//     methods: ["GET", "PATCH", "POST", "DELETE"],
//     withCredentials: true,
//     credentials: true,
//     optionSuccessStatus: 200,
//     allowedHeaders: ["Content-Type", "Authorization"],
// };

// const allowCrossDomain = (req, res, next) => {
//     res.header(
//         "Access-Control-Allow-Origin",
//         "http://localhost:4200",
//     );
//     res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// };
// app.use(allowCrossDomain);
const corsOpts = {
    origin: "*",

    methods: [
        "GET",
        "POST",
    ],

    allowedHeaders: [
        "Content-Type",
    ],
};

app.use(cors(corsOpts));
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();
// app.use(cors(corsOptions));
// app.options(
//     "*",
//     cors({
//         origin: "http://localhost:4200",
//         credentials: true,
//     }),
// );
app.use(async (req, res, next )=>{
    console.log("======================>", JSON.stringify(req.body));
    next();
}, routers);
console.log("==========================>serverless is working fine")
app.listen(8080, () => {
    const str = "connected to port";
    logFun(info, str);
});

// exports.techForumAPIs = app;
module.exports.handler = serverless(app);
