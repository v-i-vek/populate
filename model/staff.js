const mongoose = require('mongoose')



const staffSchema = mongoose.Schema({
    name:{type:String},
    address:{type:String}
})


const staffModel  = mongoose.model('staff',staffSchema)

module.exports = staffModel