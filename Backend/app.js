const express = require("express");

const app = express();
const cors = require("cors");
const { connectToDatabase } = require("./db");
const { getQuestion, getQustionPagination } = require("./paginat");

console.log("hello w    orld");
connectToDatabase();
app.use(cors());
app.get("/getquestion", getQuestion);
app.get("/pagination", getQustionPagination);
console.log("hello world");
console.log("hello worvvvld");

// server is listening to the port 3000
app.use(getQuestion);
app.listen(3000, () => { console.log("connected to port 3000 "); });
