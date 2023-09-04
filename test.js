const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and region
AWS.config.update({
  region: 'ap-south-1'
});

// Create a DynamoDB service object
const dynamodb = new AWS.DynamoDB();

// Define your DynamoDB table name
const tableName = 'IotCoreDevices';

// Define the item to be stored with a unique and sort key
const item = {
  TableName: tableName,
  Item: {
    'unique': { S: 'uniq' }, // Replace with your unique key value
    'primary': { S: 'sort-ket ' }, // Replace with your sort key value
    'OtherAttribute': { S: 'other-value' } // Replace with other attributes and values
  }
};

// Put the item into DynamoDB
dynamodb.putItem(item, (err, data) => {
  if (err) {
    console.error('Error putting item:', err);
  } else {
    console.log('Item added to DynamoDB table:', data);
  }
});
