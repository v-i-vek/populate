const express = require("express");

const officeAcRouter = express.Router();

const {
    registerDevice, getAllDevices, getDeviceById, devicePulish,
} = require("../controller/office.Ac.Controller");

const { validate, addThingValidation } = require("../middelware/validator");

officeAcRouter.post("/addthing", addThingValidation(), validate, registerDevice);

officeAcRouter.get("/getdevice/:deviceId", getDeviceById);

officeAcRouter.get("/getdevice/", getAllDevices);

officeAcRouter.post("/publishthing/:deviceId", devicePulish);

module.exports = { officeAcRouter };
