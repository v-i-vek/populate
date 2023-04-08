
const express = require('express')
const { staffGet, staffPost } = require('../controller/staff')
const { getRight, postRight } = require('../controller/right')
const staffRoute = express.Router()

staffRoute.get('/getStaff',staffGet)
staffRoute.post('/getPost',staffPost)

staffRoute.get('/rightget',getRight)
staffRoute.post('/rightpost',postRight)

module.exports = staffRoute