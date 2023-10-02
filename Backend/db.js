const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://techforum:techforum@techforum.bguthxq.mongodb.net/techforum?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (err) {
        console.log(`Error connecting to database${err}`);
    }
};
module.exports = { connectToDatabase };
