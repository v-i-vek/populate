const AWS = require("aws-sdk")
require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
const dynamo = new AWS.DynamoDB.DocumentClient();

const Table = "IotCoreDevices"
const RealTimeTable = "ReatTimeIotCoreDeviceData"

exports.handler = function(event, context) {
    console.log("+++++++++++>>>>>>>>>>>>>it is called ")
    console.log("==========================",event)

    const tempParams = {
    TableName: Table,
    Item:{
        "primaryKey":uuidv4(),
          "qos":process.env.QOS,
        "endpoint":process.env.ENDPOINT,
        ...event
        // "status": event.status,
        // "temperature": event.temperature,
        // "mode":event.mode,
        // "unit":event.unit,
        // "timestamp": event.timeStamp,
        // "qos":process.env.QOS,
        // "endpoint":process.env.ENDPOINT
        },
        
    };
    const realTimeData = {
        TableName:RealTimeTable,
        Item:{
            "deviceId":event.deviceId,
            "qos":process.env.QOS,
            "endpoint":process.env.ENDPOINT,
            ...event
        }
    }
    console.log()
    dynamo.put(realTimeData,function (err,data) {
        if(err){
            console.log("ERROR",err);
            return err
        }
        console.log("data of realTimeData ", data)
    })

    dynamo.put(tempParams, function(err, data) {
        if (err) {
            console.log("ERROR",err)
           return err
        } 
        console.log("data", data)
        return "Stored the device messages successfully"
    });
    
    
  
}