// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");
// const officeAcModel = require("../model/office.Ac.Model");
const { v4: uuidv4 } = require("uuid");
const { db, Table } = require("../db.config");
// const acControleValue = async (req, res) => {
//     try {
//         let {
//             // eslint-disable-next-line prefer-const
//             status, temperature, unit, mode, sleepTimer, Time,
//         } = req.body;
//         if (temperature < 16) {
//             temperature = 16;
//         }
//         if (temperature >= 30) {
//             temperature = 30;
//         }
//         const params ={
//             TableName:Table
//         }
//     } catch (error) {
//         console.log("error", error);
//         return res.status(500).json({
//             satus: 500,
//             error: "Server Error",
//         });
//     }
// };

const registerDevice = async (req, res) => {
    console.log("======", req.body);
    const { thingName, location } = req.body;
    console.log("+++", thingName);

    AWS.config.update({
        region: "ap-south-1",
    });

    const iot = new AWS.Iot();

    const attributes = {
        location,
    };

    const params = {
        thingName,
        attributePayload: {
            attributes,
            merge: true, // Set to true to merge with existing attributes or false to overwrite
        },
    };
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    const dbParams = {
        TableName: Table,
        Item: {

            primaryKey: { S: uuidv4() }, // Replace with your unique key value
            thingName: { S: thingName },
            location: { S: location },
            time: { S: dateTime },
        },
    };
    iot.createThing(params, async (err, data) => {
        if (err) {
            console.error("Error creating thing:", err);
            return res.status(500).json({ status: "failed", message: err });
        }
        try {
            db.putItem(dbParams, (error, dataValue) => {
                if (error) {
                    return res.status(502).json({ status: "failed", message: error });
                }
                console.log("======>", dataValue);
                return res.status(201).json({ status: "success", message: dataValue });
            });
        } catch (error) {
            console.log("Error from the catch blog of the database", error);
            return res.status(500).json({ status: "failed", message: error });
        }
    });
};

// this function is to add the thing into the group name
function addThingToThingGroup(thingName, thingGroupName) {
    const iot = new AWS.Iot();

    const params = {
        thingGroupName,
        thingName,
    };

    iot.addThingToThingGroup(params, (err, data) => {
        if (err) {
            console.error("Error adding thing to thing group:", err);
        } else {
            console.log(`Thing '${thingName}' added to thing group '${thingGroupName}'`);
        }
    });
}

module.exports = { registerDevice };
