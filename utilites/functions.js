const AWS = require("aws-sdk");

const iot = new AWS.Iot();
const publishDeviceData = async (
    topicPub,
    endpoint,
    qos,
    status,
    temperature,
    mode,
    dateTime,
    origin,
    unit,
    hearBeat,
    deviceId,
) => {
    const iot = new AWS.IotData({ endpoint });

    // Publish a message
    const publishParams = {
        topic: topicPub,
        payload: JSON.stringify({
            status, temperature, mode, dateTime, origin,unit,hearBeat,deviceId
        }),
        qos,
    };
    try {
        await iot.publish(publishParams).promise();
        console.log("Message published successfully");
        return 0;
    } catch (error) {
        console.error("Error publishing message:", error);
        return 1;
    }
};

// this function is for register the iot device in the group
function addThingToThingGroup(thingName, location) {
    const thingGroupValue = (location === "home") ? "home_ac_group" : "office_ac_group";

    const params = {
        thingArn: `arn:aws:iot:ap-south-1:176306079773:thing/${thingName}`,
        thingGroupArn: `arn:aws:iot:ap-south-1:176306079773:thinggroup/${thingGroupValue}`,
        thingGroupName: thingGroupValue,
        thingName,
    };
    iot.addThingToThingGroup(params, (err, data) => {
        if (err) { console.log("this is the error ++++>",err)
             return 1;
             } // an error occurred
        else{

            console.log("this is the data ==========>",data);
            return 0; // successful response
        }
    });
}

const createRuleInIotCore = async (topic, thingName) => {
    const ruleName = `${thingName}_device_rule`; // creating rulle name
    const ruleSql = `SELECT * FROM "${topic}"`; // creating the sql quesry
    const topicRulePayload = {
        sql: ruleSql,
        actions: [
            {
                lambda: {
                    functionArn: "arn:aws:lambda:ap-south-1:176306079773:function:pub_sub_version_3", // Replace with your Lambda function's ARN
                },
            },
        ],
    };

    try {
        await iot.createTopicRule({ ruleName, topicRulePayload }).promise();
        console.log(`Created IoT Core rule: ${ruleName}`);
        return 0;
    } catch (err) {
        console.error(`Error creating IoT Core rule: ${err}`);
        return 1;
      
    }
};
const deleteThing = (thingName) => {
    const params = {
        thingName, // write the name of thing which should be deleted

    };
    iot.deleteThing(params, (err, data) => {
        if (err) {
            console.log(err)
            return 1;
        }; // an error occurred
        return 0; // successful response
    });
};

module.exports = {
    publishDeviceData, addThingToThingGroup, createRuleInIotCore, deleteThing,
};