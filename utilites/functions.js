const AWS = require("aws-sdk");

const publishDeviceData = async (topicPub, endpoint, qos, status, temperature, mode,dateTime) => {
    const iot = new AWS.IotData({ endpoint });

    // Publish a message
    const publishParams = {
        topic: topicPub,
        payload: JSON.stringify({
            status, temperature, mode, dateTime,
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


module.exports = { publishDeviceData, addThingToThingGroup };
