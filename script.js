const awsIot = require("aws-iot-device-sdk");
const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
    // accessKeyId: 'AKIASSDFJJAOXOSQ7AUQ',
    // secretAccessKey: '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'
});
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const clientId = "Ac_31_home";
const device = awsIot.device({
    keyPath: "./6bd8efa3ba8e91b26689fe828d6bd0ea6f6d7de6f63de5dcbb280e2459185f90-private.pem.key",
    certPath: "./6bd8efa3ba8e91b26689fe828d6bd0ea6f6d7de6f63de5dcbb280e2459185f90-certificate.pem.crt",
    caPath: "./AmazonRootCA1.pem",
    clientId,
    host: "a1o3wd94h6eh2i-ats.iot.ap-south-1.amazonaws.com",
});

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

const topicPublish = "home/Ac_31_home";
const topicSubscribe = "home/Ac_31_home";
const location = "home";
const deviceId = "1694685996186";
const count = 0;

const params = {
    TableName: "ReatTimeIotCoreDeviceData",
    Key: {
        deviceId: { S: deviceId },
    },

};
let value = {};
let tempUnitValue;
const getValueOfDevicefromDB = () => {
    ddb.getItem(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            value = data.Item;
            tempUnitValue = value.unit.N;
            console.log("Success", data.Item);
            return data.Item;
        }
    });
};

value = getValueOfDevicefromDB();
console.log(value)
const dataobj = {
    status: "on",
    temperature: 2,
    mode: "cool",
    unit: count,
    time: dateTime,
    thingName: clientId,
    origin: "device",
    location,
    deviceId,
    topicPublish,
    topicSubscribe,
};

// publishing and subscribing data

device
    .on("connect", () => {
        console.log("connect");
    });

// publishng data in every 5 second

const check = setInterval(() => {
    tempUnitValue++;
    dataobj.unit = tempUnitValue;
    device.publish(topicPublish, JSON.stringify(dataobj),{qos:1});
}, 5000);
device.subscribe(topicSubscribe);

// checking the data is sent or recieve
device
    .on("message", (topic, payload) => {
        console.log("=======>message", payload.toString());

        let subscribeValue = payload.toString();
        subscribeValue = JSON.parse(subscribeValue);

        if (subscribeValue.status === "on" && subscribeValue.origin === "client") {
            console.log("publishing data");

            setInterval(() => {
                tempUnitValue++;
                dataobj.unit = tempUnitValue;
                dataobj.origin = "client";
                dataobj.temperature = subscribeValue.tempUnitValue;
                dataobj.mode = subscribeValue.mode;
                dataobj.status = subscribeValue.status;
                device.publish(topicPublish, JSON.stringify(dataobj));
            }, 5000);
        }

        if (subscribeValue.status === "off") {
            console.log("ac is turned off");
            clearInterval(check);
        }
    });
