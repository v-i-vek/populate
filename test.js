const cars = ["mercedeez", "bmw"];
const AWS = require("aws-sdk");
AWS.config.update({
    region: "ap-south-1",
});
const iot = new AWS.Iot();


// // for (const car of cars) {
// //     for (const carValue of car) {
// //         console.log(carValue);
// //     }
// //     console.log();
// // }

// using primitive for loop
// for (let i = 0; i < cars.length; i++) {
//     for (let j = 0; j < cars[i].length; j++) {
//         console.log(cars[i][j]);
//     }
//     console.log("");
// }

// cars.forEach((value, index,arr)=>{
    
// })

const result  =   (thingName, location)=> {
    const thingGroupValue = (location === "home") ? "home_ac_group" : "office_ac_group";

    const params = {
        thingArn: `ar:thing/${thingName}`,
        thingGroupArn: `arn/${thingGroupValue}`,
        thingGroupName: thingGroupValue,
        thingName,
    };
    const value = iot.addThingToThingGroup(params, (err, data) => {
        return new Promise((resolve, reject) => {
            const thingGroupValue = (location === "home") ? "home_ac_group" : "office_ac_group";
    
            const params = {
                thingArn: `ar:thing/${thingName}`,
                thingGroupArn: `arn/${thingGroupValue}`,
                thingGroupName: thingGroupValue,
                thingName,
            };
    
            iot.addThingToThingGroup(params, (err, data) => {
                if (err) {
                    console.error("Error:", err);
                    reject(err);
                } else {
                    console.log("Data:", data);
                    resolve(data);
                }
            });
        });
})
}

let location ="home"
let thingName = "ac"
const val  = result(thingName,location)
console.log(val);