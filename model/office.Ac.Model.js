const mongoose = require("mongoose");

const officeAcSchema = mongoose.Schema({

    status: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    sleepTimer: {
        type: String,
        required: true,
    },

    Time: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model("officeSchema", officeAcSchema);
