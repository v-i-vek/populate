// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();
// const officeAcModel = require("../model/office.Ac.Model");
const { v4: uuidv4 } = require("uuid");
const { db, Table } = require("../db.config");
const {
    publishDeviceData,
    createRuleInIotCore,
    addThingToThingGroup,
    deleteThing,
} = require("../utilites/functions");
const { dateTime } = require("../utilites/variables");

const RealTimeTable = "ReatTimeIotCoreDeviceData";

// getting all the device from the dynamo db

const getAllDevices = async (req, res) => {
    try {
        const params = {
            TableName: RealTimeTable,
        };
        const allDeviceData = await db.scan(params).promise();
        return res.status(200).json({
            status: "Success",
            message: "Thing Fetched Successfully!",
            data: allDeviceData,
        });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "server error" });
    }
};

// Getting all the devices from the dynamodb
const getDeviceById = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const deviceValue = await docClient
            .get({
                TableName: RealTimeTable,
                Key: {
                    deviceId,
                },
            })
            .promise();

        console.log(" ======> ", deviceValue);

        if (Object.keys(deviceValue).length === 0) {
            return res
                .status(400)
                .json({ status: "failed", message: "sorry Device is not registered" });
        }

        return res.status(200).json({ status: "success", message: deviceValue });
    } catch (error) {
        console.log(Error, error);

        return res.status(503).json({ status: "failed", message: error });
    }
};

// registering the device in database and iot_core_thing
const registerDevice = async (req, res) => {
    const {
        thingName,
        location,
        topicPublish,
        topicSubscribe,
        status,
        temperature,
        mode,
        sleepTimer,
    } = req.body;

    const deviceId = new Date().getTime().toString();

    const iot = new AWS.Iot();

    const deviceValue = await docClient
        .scan({
            TableName: Table,
            FilterExpression: "#thingName = :thingName",
            ExpressionAttributeNames: { "#thingName": "thingName" },
            ExpressionAttributeValues: { ":thingName": thingName },
        })
        .promise();

    if (deviceValue.Items.length !== 0) {
        return res.status(400).json({
            status: "failed",
            message: "sorry Device is already registered",
        });
    }

    const attributes = {
        location,
        topicPublish,
        topicSubscribe,
    };

    const params = {
        thingName,
        attributePayload: {
            attributes,
            merge: true, // Set to true to merge with existing attributes or false to overwrite
        },
    };

    // value to add in the database
    const dbParams = {
        TableName: Table,
        Item: {
            primaryKey: { S: uuidv4() }, // Replace with your unique key value
            thingName: { S: thingName },
            location: { S: location },
            topicPublish: { S: topicPublish },
            topicSubscribe: { S: topicSubscribe },
            status: { S: status },
            temperature: { S: temperature },
            mode: { S: mode },
            deviceId: { S: deviceId },
            sleepTimer: { S: sleepTimer },
            time: { S: dateTime },
        },
    };
    const unit = 0;
    const realTimeDB = {
        TableName: "ReatTimeIotCoreDeviceData",
        Item: {
            deviceId: { S: deviceId }, // Replace with your unique key value
            thingName: { S: thingName },
            location: { S: location },
            topicPublish: { S: topicPublish },
            topicSubscribe: { S: topicSubscribe },
            status: { S: status },
            temperature: { S: temperature },
            mode: { S: mode },
            sleepTimer: { S: sleepTimer },
            time: { S: dateTime },
            unit: { N: unit.toString() },
        },
    };

    // this will create Thing into iot core and add the respected data to the dynamoDB
    iot.createThing(params, async (err, data) => {
        if (err) {
            console.error("Error creating thing:", err);
            return res.status(500).json({ status: "failed", message: err });
        }
        try {
            addThingToThingGroup(thingName, location);
            await createRuleInIotCore(topicPublish, thingName);

            const realTimeDb = await db.putItem(realTimeDB).promise();

            const result = await db
                .putItem(dbParams)
                .promise()
                .then(() => res
                    .status(201)
                    .json({ status: "success", message: "Data added successfully" }));
        } catch (error) {
            console.log(error);
            return res.status(500).json({ status: "failed", message: error });
        }
    });
};

// this will publish the data and will create new data in the dynamodb
const devicePulish = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const {
            status, temperature, mode, origin,
        } = req.body;

        // const deviceValue = await docClient.scan({
        //     TableName: Table, FilterExpression: "#deviceId = :deviceId", ExpressionAttributeNames: { "#deviceId": "deviceId" },
        //  ExpressionAttributeValues: { ":deviceId": deviceId },
        // }).promise();
        const deviceValue = await docClient
            .get({
                TableName: "ReatTimeIotCoreDeviceData",
                Key: {
                    deviceId,
                },
            })
            .promise();

        if (Object.keys(deviceValue).length === 0) {
            return res
                .status(400)
                .json({ status: "failed", message: "sorry Device is not registered" });
        }
        if (deviceId !== deviceValue.Item.deviceId) {
            return res
                .status(400)
                .json({ status: "failed", message: "sorry Device is not registered" });
        }
        // topicPub, endpoint, qos, status, temperature, mode, sleepTimer,dateTime
        const dbParams = {
            TableName: Table,

            Item: {
                primaryKey: { S: uuidv4() },
                thingName: { S: deviceValue.Item.thingName },
                origin: { S: origin },
                location: { S: deviceValue.Item.location },
                topicPublish: { S: deviceValue.Item.topicPublish },
                topicSubscribe: { S: deviceValue.Item.topicSubscribe },
                status: { S: status },
                temperature: { S: temperature },
                mode: { S: mode },
                endpoint: { S: process.env.ENDPOINT },
                qos: { S: process.env.QOS },
                deviceId: { S: deviceValue.Item.deviceId },
                // sleepTimer: { S: sleepTimer },
                time: { S: dateTime },
            },
        };
        await db.putItem(dbParams).promise();

        await publishDeviceData(
            deviceValue.Item.topicPublish,
            process.env.ENDPOINT,
            process.env.QOS,
            status,
            temperature,
            mode,
            dateTime,
            origin,
        );

        return res.status(200).json({ status: "success", message: deviceValue });
    } catch (error) {
        console.log(Error, error);
        return res.status(500).json({ status: "failed", message: error });
    }
};

const deleteRegisterThing = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const deviceValue = await docClient
            .get({
                TableName: RealTimeTable,
                Key: {
                    deviceId,
                },
            })
            .promise();
        console.log(deviceValue);
        deleteThing(deviceValue.Item.thingName);
        docClient.delete({
            TableName: RealTimeTable,
            Key: {
                deviceId,
            },
        }, (err, data) => {
            if (err) {
                return res.status(500).json({ status: "failed", message: "error while deleting from database", data: err });
            }
            return res.status(200).json({ status: "success", message: "deleted successfully" });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error });
    }
};

module.exports = {
    registerDevice,
    getDeviceById,
    getAllDevices,
    devicePulish,
    deleteRegisterThing,
};
