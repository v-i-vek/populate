const express = require("express");

const officeAcRouter = express.Router();
const { registerDevice, getAllDevices , getDeviceById, devicePulish } = require("../controller/office.Ac.Controller");

officeAcRouter.post("/addthing", registerDevice);

officeAcRouter.get("/getdevice/:id", getDeviceById);

officeAcRouter.get("/getdevice/", getAllDevices);

officeAcRouter.post("/publishthing/:deviceId", devicePulish);



module.exports = { officeAcRouter };
