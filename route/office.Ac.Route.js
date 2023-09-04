const express = require('express')
const officeAcRouter = express.Router();
const {registerDevice} = require('../controller/office.Ac.Controller')

officeAcRouter.post('/addthing',registerDevice)


module.exports = {officeAcRouter}