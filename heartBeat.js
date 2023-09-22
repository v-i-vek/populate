const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
});

const doc = new AWS.DynamoDB.DocumentClient();
// const officeAcModel = require("../model/office.Ac.Model");

// const value = async () => {
//     const primaryKey = uuidv4();
//     try {
//         const message = obj;

//         if (message.deviceId) {
//             // Update the last seen timestamp for the device
//             connectedDevices[message.deviceId] = Date.now();
//             console.log(" =====> ", connectedDevices);
//             await doc.put({ TableName: "heartBeat", Item: { primaryKey, deviceId: connectedDevices[message.deviceId] } }).promise();
//             console.log(`Received heartbeat from device ${message.deviceId}`);

//             // Implement additional business logic if needed

//             return { statusCode: 200, body: "OK" };
//         }
//         return { statusCode: 400, body: "Invalid message format" };
//     } catch (error) {
//         console.error(`Error processing message: ${error}`);
//         return { statusCode: 500, body: "Error processing message" };
//     }
// };
// value();

// Periodically check for disconnected devices
// setInterval(async () => {
//     const currentTime = Date.now();
//     const disconnectThreshold = 120000; // Threshold in milliseconds (e.g., 10 minutes)
//     const result = await doc.scan({ TableName: "heartBeat" }).promise();
//     const connectedDevices = result.Items
//     for(let item of connectedDevices){
//         for (const deviceId in item) {

//             if (item.hasOwnProperty(deviceId)) {
//                 const lastSeenTimestamp = item["deviceId"];
//                 // console.log("+++++++++++++++++++===================",lastSeenTimestamp)
//                 if (currentTime - lastSeenTimestamp > disconnectThreshold) {
//                     // Device is considered disconnected
//                     console.log(currentTime-lastSeenTimestamp)
//                     console.log(`Device disconnected: ${item["deviceId"]}`);

//                     // Implement further actions for disconnected devices if needed
//                 }
//                 // else{
//                 //     console.log("+++++++","device is still connected" , item["deviceId"])
//                 // }
//             }
//         }
//     }
// }, 3000); // Check every minute

const val = async () => {
    const currentTime = Date.now();
    const disconnectThreshold = 120000; // Threshold in milliseconds
    const result = await doc.scan({ TableName: "ReatTimeIotCoreDeviceData" }).promise();
    const connectedDevices = result.Items;
    for (const item of connectedDevices) {
        const lastSeenTimestamp = item.heartBeat;
        if (currentTime - lastSeenTimestamp > disconnectThreshold) {
            const setElectricStatus = "offline";
            console.log("Device disconnected:", item.thingName);
            try {
                console.log(item.deviceId);
                if (item.electricStatus === "online") {
                    await doc.update({
                        TableName: "ReatTimeIotCoreDeviceData",
                        Key: { deviceId: item.deviceId },
                        UpdateExpression:
                             "set #pc = :newElectricStatus",
                        ExpressionAttributeValues: {
                            ":newElectricStatus": setElectricStatus,

                        },
                        ExpressionAttributeNames: {
                            "#pc": "electricStatus",

                        },
                    }).promise();
                }
                // console.log(check)
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("is online ", item.thingName);
            if (item.electricStatus === "offline") {
                const setElectricStatus = "online";
                await doc.update({
                    TableName: "ReatTimeIotCoreDeviceData",
                    Key: { deviceId: item.deviceId },
                    UpdateExpression:
                         "set #pc = :newElectricStatus",
                    ExpressionAttributeValues: {
                        ":newElectricStatus": setElectricStatus,

                    },
                    ExpressionAttributeNames: {
                        "#pc": "electricStatus",

                    },
                }).promise();
            }
        }
    }
};
setInterval(val,3000)
