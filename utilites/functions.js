const AWS = require("aws-sdk");

const iot = new AWS.Iot();
const publishDeviceData = async (topicPub, endpoint, qos, status, temperature, mode, dateTime,origin) => {
    const iot = new AWS.IotData({ endpoint });

    // Publish a message
    const publishParams = {
        topic: topicPub,
        payload: JSON.stringify({
            status, temperature, mode, dateTime,origin
        }),
        qos,
    };
    try {
        await iot.publish(publishParams).promise();
        console.log("Message published successfully");
    } catch (error) {
        console.error("Error publishing message:", error);
    }
};

// this function is for register the iot device in the group
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

const createRuleInIotCore = async (topic, thingName) => {
    const ruleName = `${thingName}_device_rule`; // Replace with your desired rule name
    const ruleSql = `SELECT * FROM "${topic}"`; // Replace with your desired SQL query
    const topicRulePayload = {
        sql: ruleSql,
        actions: [
            {
                lambda: {
                    functionArn: "arn:aws:lambda:ap-south-1:176306079773:function:iot_core_data_pub_sub_device", // Replace with your Lambda function's ARN
                },
            },
        ],
    };

    try {
        await iot.createTopicRule({ ruleName, topicRulePayload }).promise();

        console.log(`Created IoT Core rule: ${ruleName}`);
    } catch (err) {
        console.error(`Error creating IoT Core rule: ${err}`);
    }
};

module.exports = { publishDeviceData, addThingToThingGroup, createRuleInIotCore };
