const express = require('express')
const app = express()
const staffRoute  = require('./route/staff')
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/').then(()=>{console.log("db connected");}).catch(e=>{console.log(e);})
app.use(staffRoute)

app.listen(3000,()=>{console.log("server is running");})




