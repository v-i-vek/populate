const express = require("express");
const serverless = require('serverless-http');

const {officeAcRouter} = require('./route/office.Ac.Route')
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/device',officeAcRouter)
app.get("/",(req,res)=>{res.send("hello world")})

app.listen(8080,()=>{
    console.log("server is running at port")
})

module.exports.handler = serverless(app);
