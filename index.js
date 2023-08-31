const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  
  const {status,temperature,mode , sleepTimer} = event;
  if(temperature > 30){
    temperature = 30;
  }
  if(temperature < 16 && temperature>0){
    temperature = 16;
  }

  const iot = new AWS.IotData({ endpoint: 'a1o3wd94h6eh2i-ats.iot.ap-south-1.amazonaws.com' });

  // Publish a message
  const publishParams = {
    topic: 'device/fan',
    payload: JSON.stringify({ status,temperature,mode,sleepTimer }),
    qos: 1
  };

  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time





event.time = dateTime
console.log("==========================>",event)

  try {
    await iot.publish(publishParams).promise();
    console.log('Message published successfully');
  } catch (error) {
    console.error('Error publishing message:', error);
  }

  // Subscribe to a topic
  const subscribeParams = {
    topic: 'device/fan',
    qos: 1
  };

  try {
    const subscription = await iot.subscribe(subscribeParams).promise();

    subscription.on('message', (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      // Process the received message as needed
    });

    console.log('Subscribed to topic:', subscribeParams.topic);
  } catch (error) {
    console.error('Error subscribing to topic:', error);
  }

  return 'Execution completed';
};
