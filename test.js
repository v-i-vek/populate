const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

const deviceId = "1695204098194";
// const temperature = "28";
//

const d = {
    status: "on",
    temperature: 2,
    mode: "cool",
    unit: 112,
    time: "2023-9-21 12:44:9",
    thingName: "Ac_31_office",
    origin: "device",
    location: "home",
    deviceId: "1694771926124",
    topicPublish: "device/home/Ac_31_home",
    topicSubscribe: "device/home/Ac_31_home",

};

const exp = {
    UpdateExpression: "set",
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
};
for (const [key, value] of Object.entries(d)) {
    if(key === "deviceId"){
        continue;
    }
    exp.UpdateExpression += `#${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = value;
}
exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);

const dbparams = {
    TableName: "ReatTimeIotCoreDeviceData",

    Key: {
        deviceId,
    },

};
dbparams.UpdateExpression = exp.UpdateExpression;
dbparams.ExpressionAttributeNames = exp.ExpressionAttributeNames;
dbparams.ExpressionAttributeValues = exp.ExpressionAttributeValues;

console.log(dbparams);

const updateValue = async () => {
    try {
        const value = await docClient.update(dbparams).promise();
        console.log("updated successfully", value);
    } catch (error) {
        console.log(error);
    }
};

updateValue();
