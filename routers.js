const express = require("express");

const routers = express();
const { officeAcRouter } = require("./route/office.Ac.Route");

routers.use("/devices", officeAcRouter);

module.exports = { routers };
