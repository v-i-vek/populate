const officeAcModel = require("../model/office.Ac.Model");

const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-south-1",
    // accessKeyId: "your-access-key-id",
    // secretAccessKey: "your-secret-access-key",
});










// const officeAcController = async (req, res) => {
//     try {
//         let {
//             // eslint-disable-next-line prefer-const
//             status, temperature, unit, mode, sleepTimer, Time,
//         } = req.body;
//         if (temperature < 16) {
//             temperature = 16;
//         }
//         if (temperature >= 30) {
//             temperature = 30;
//         }
//         const valueOfAc = new officeAcModel({
//             status, temperature, unit, mode, sleepTimer, Time,
//         });

//         await valueOfAc.save();
//         return res.status(200).json({
//             satus: 200,
//             message: valueOfAc,
//         });
//     } catch (error) {
//         console.log("error", error);
//         return res.status(500).json({
//             satus: 500,
//             error: "Server Error",
//         });
//     }
// };





const registerDevice = async(req,res)=>{
const thingName = req.body.thingName;

AWS.config.update({
    region: "ap-south-1",
});

const iot = new AWS.Iot();

// const thingName = "MyAutomaticThing"; // Replace with your desired thing name

// this will add the attribute in the thing
const attributes = {
    color: 'blue',
    location: 'office'
  };

const params = {
    thingName,
    attributePayload: {
        attributes: attributes,
        merge: true // Set to true to merge with existing attributes or false to overwrite
      }
};

iot.createThing(params, (err, data) => {
    if (err) {
        console.error("Error creating thing:", err);
        return res.status(500).json({status:"failed",message:err})
    } else {
      return res.status(201).json({status:"success",message:data.thingName})
        console.log("Thing created successfully:", data.thingName);
    }
});

}



// this function is to add the thing into the group name
function addThingToThingGroup(thingName, thingGroupName) {
    const iot = new AWS.Iot();
  
    const params = {
      thingGroupName: thingGroupName,
      thingName: thingName
    };
  
    iot.addThingToThingGroup(params, (err, data) => {
      if (err) {
        console.error('Error adding thing to thing group:', err);
      } else {
        console.log(`Thing '${thingName}' added to thing group '${thingGroupName}'`);
      }
    });
  }
  




module.exports = {registerDevice};