const mongooose = require('mongoose')


const rightSchema = mongooose.Schema({
    staff_id:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'staff'
    },
    right:{
        type:String
    }
})

const rightModel = mongooose.model('right',rightSchema)

module.exports = rightModel