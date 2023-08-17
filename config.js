const mongoose = require("mongoose");
const { logFun, error, info } = require("./logger/logger");

const mongoSuccess = "connected to database";

/**
 * This funtion will use to connect to the database
 */
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logFun(info, mongoSuccess);
    } catch (err) {
        logFun(error, err);
    }
};

module.exports = { connectToDatabase };
