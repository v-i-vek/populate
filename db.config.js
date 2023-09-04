const AWS = require("aws-sdk");

AWS.config.update({
    region: "ap-south-1",
});

const db = new AWS.DynamoDB();

const Table = "IotCoreDevices";

module.exports = {
    db,
    Table,
};
