const AWS = require("aws-sdk");

// Configure AWS SDK with your credentials and region
AWS.config.update({
    // accessKeyId: "ap-south-1",
    // secretAccessKey: "your-secret-access-key",
    region: "ap-south-1",
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();

// Example: List all tables
dynamodb.listTables({}, (err, data) => {
    if (err) {
        console.error("Error listing tables:", err);
    } else {
        console.log("Tables:", data.TableNames);
    }
});

// Example: Put an item into a DynamoDB table
const params = {
    TableName: "IotCoreDevices",
    Item: {
        'unique': { S: '4' }, // Replace with your unique key value
    'primary': { S: '4' }, // Replace with your sort key value
    },
};

dynamodb.putItem(params, (err, data) => {
    if (err) {
        console.error("Error putting item:", err);
    } else {
        console.log("Item added to DynamoDB table:", data);
    }
});
