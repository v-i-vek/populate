const AWS = require("aws-sdk");

// Configure AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: "your-access-key",
    secretAccessKey: "your-secret-access-key",
    region: "your-aws-region",
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
    TableName: "YourTableName",
    Item: {
        Id: { N: "1" }, // Numeric attribute
        Name: { S: "John Doe" }, // String attribute
    },
};

dynamodb.putItem(params, (err, data) => {
    if (err) {
        console.error("Error putting item:", err);
    } else {
        console.log("Item added to DynamoDB table:", data);
    }
});
