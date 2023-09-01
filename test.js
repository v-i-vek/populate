const AWS = require("aws-sdk");

// Set up AWS credentials (make sure you configure AWS CLI or use environment variables)
AWS.config.update({
    region: "ap-south-1",
    // accessKeyId: "your-access-key-id",
    // secretAccessKey: "your-secret-access-key",
});

const iot = new AWS.Iot();

const thingName = "MyAutomaticThing"; // Replace with your desired thing name

const params = {
    thingName,
};

iot.createThing(params, (err, data) => {
    if (err) {
        console.error("Error creating thing:", err);
    } else {
        console.log("Thing created successfully:", data.thingName);
    }
});
