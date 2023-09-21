const { CostExplorer } = require("aws-sdk");
const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
});

const doc = new AWS.DynamoDB.DocumentClient();
// const officeAcModel = require("../model/office.Ac.Model");
const { v4: uuidv4 } = require("uuid");

const connectedDevices = {

}; // Object to track connected devices

const obj = {
    deviceId: "12345",
};
const value = async () => {
    const primaryKey = uuidv4();
    try {
        const message = obj;

        if (message.deviceId) {
            // Update the last seen timestamp for the device
            connectedDevices[message.deviceId] = Date.now();
            console.log(" =====> ", connectedDevices);
            await doc.put({ TableName: "heartBeat", Item: { primaryKey, deviceId: connectedDevices[message.deviceId] } }).promise();
            console.log(`Received heartbeat from device ${message.deviceId}`);

            // Implement additional business logic if needed

            return { statusCode: 200, body: "OK" };
        }
        return { statusCode: 400, body: "Invalid message format" };
    } catch (error) {
        console.error(`Error processing message: ${error}`);
        return { statusCode: 500, body: "Error processing message" };
    }
};
const check = value();

// Periodically check for disconnected devices
setInterval(async () => {
    const currentTime = Date.now();
    const disconnectThreshold = 3000; // Threshold in milliseconds (e.g., 10 minutes)
    const result = await doc.scan({ TableName: "heartBeat" }).promise();
    const connectedDevices = result.Items[1]
    for (const deviceId in connectedDevices) {

        if (connectedDevices.hasOwnProperty(deviceId)) {
            const lastSeenTimestamp = connectedDevices[deviceId];
            if (currentTime - lastSeenTimestamp > disconnectThreshold) {
                // Device is considered disconnected
                console.log(`Device disconnected: ${deviceId}`);
                delete connectedDevices[deviceId];

                // Implement further actions for disconnected devices if needed
            }
        }
    }
}, 3000); // Check every minute
