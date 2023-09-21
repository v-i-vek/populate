const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const { routers } = require("./routers.js");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())     ;
app.use(bodyParser.json());
// app.use(express.raw({ type: "application/json" }));

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.use((req, res, next) => {
//   const buf = Buffer.from(req.body, "base64");
//   const temp = JSON.parse(buf.toString());
//   req.body = temp;
//   next();
// }, routers);
app.use(routers)

app.listen(8080, () => {
  console.log("server is running at port");
});

module.exports.handler = serverless(app);
