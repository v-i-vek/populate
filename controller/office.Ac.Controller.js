// eslint-disable-next-line import/no-extraneous-dependencies
const { CostExplorer } = require("aws-sdk");
const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-south-1",
});


const docClient = new AWS.DynamoDB.DocumentClient()
// const officeAcModel = require("../model/office.Ac.Model");
const { v4: uuidv4 } = require("uuid");
const { db, Table } = require("../db.config");
const { publishDeviceData } = require("../utilites/functions");
const { dateTime } = require("../utilites/variables");

// getting all the device from the dynamo db

const getAllDevices = async (req, res) => {
    try {
        const params = {
            TableName: Table,
        };
        const allDeviceData = await db.scan(params).promise();
        return res.status(200).json({ status: "Success", message: "Thing Fetched Successfully!", data: allDeviceData });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "server error" });
    }
};

// Getting all the devices from the dynamodb
const getDeviceById = async (req, res) => {
    try {
        const { id } = req.params;
        const params = {
            TableName: Table,
            Key: {
                primaryKey: { S: id },
            },
        };

        const deviceValue = await db.getItem(params).promise();
        console.log(" ======> ", deviceValue.Item.primaryKey.S);
        if (Object.keys(deviceValue).length === 0) {
            return res.status(400).json({ status: "failed", message: "sorry Device is not registered" });
        }
        if (id !== deviceValue.Item.primaryKey.S) {
            return res.status(400).json({ status: "failed", message: "sorry Device is not registered" });
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
        thingName, location, topicPublish, topicSubscribe, status, temperature, mode, sleepTimer,
    } = req.body;
    const deviceId = new Date().getTime().toString();
    const iot = new AWS.Iot();

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

    // this will create Thing into iot core and add the respected data to the dynamoDB
    iot.createThing(params, async (err, data) => {
        if (err) {
            console.error("Error creating thing:", err);
            return res.status(500).json({ status: "failed", message: err });
        }
        try {
            const result = await db.putItem(dbParams).promise()
                .then(() => res.status(201).json({ status: "success", message: "Data added successfully" }));
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
        console.log("==========", deviceId);
        const {
            status, temperature, mode,
        } = req.body;
        console.log("comming");
        const deviceValue = await docClient.scan({
            TableName: Table, FilterExpression: "#deviceId = :deviceId", ExpressionAttributeNames: { "#deviceId": "deviceId" }, ExpressionAttributeValues: { ":deviceId": deviceId },
        }).promise();
        console.log("==========================", deviceValue);
        if (Object.keys(deviceValue).length === 0) {
            return res.status(400).json({ status: "failed", message: "sorry Device is not registered" });
        }
        if (deviceId !== deviceValue.Items[0].deviceId) {
            return res.status(400).json({ status: "failed", message: "sorry Device is not registered" });
        }
        console.log("====>", deviceValue);
        // topicPub, endpoint, qos, status, temperature, mode, sleepTimer,dateTime
        const dbParams = {
            TableName: Table,
            Item: {

                primaryKey: { S: uuidv4() },
                thingName: { S: deviceValue.Items[0].thingName },
                location: { S: deviceValue.Items[0].location },
                topicPublish: { S: deviceValue.Items[0].topicPublish },
                topicSubscribe: { S: deviceValue.Items[0].topicSubscribe },
                status: { S: status },
                temperature: { S: temperature },
                mode: { S: mode },
                endpoint: { S: process.env.ENDPOINT },
                qos: { S: process.env.QOS },
                deviceId: { S: deviceValue.Items[0].deviceId },
                // sleepTimer: { S: sleepTimer },
                time: { S: dateTime },
            },
        };
        await db.putItem(dbParams).promise();
        console.log("finished +++++++++++++++++++++++");
        await publishDeviceData(deviceValue.Items[0].topicPublish, process.env.ENDPOINT, process.env.QOS, status, temperature, mode, dateTime);

        return res.status(200).json({ status: "success", message: deviceValue });
    } catch (error) {
        console.log(Error, error);
        return res.status(500).json({ status: "failed", message: error });
    }
};

module.exports = {
    registerDevice, getDeviceById, getAllDevices, devicePulish,
};
