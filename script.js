
const awsIot = require('aws-iot-device-sdk');
const AWS = require("aws-sdk")


AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIASSDFJJAOXOSQ7AUQ',
  secretAccessKey: '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'
});

var device = awsIot.device({
    keyPath: './6bd8efa3ba8e91b26689fe828d6bd0ea6f6d7de6f63de5dcbb280e2459185f90-private.pem.key',
   certPath: './6bd8efa3ba8e91b26689fe828d6bd0ea6f6d7de6f63de5dcbb280e2459185f90-certificate.pem.crt',
     caPath:'./AmazonRootCA1.pem',
   clientId: 'home_AC',
       host:'a1o3wd94h6eh2i-ats.iot.ap-south-1.amazonaws.com'
 })




 device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('device/fan');
    // device.publish('device/fan', JSON.stringify({"listen":"over and out"}));
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });