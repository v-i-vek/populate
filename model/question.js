const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answer",
    },
    question: {
        type: String,
        required: true,
    },
    questionDescribe: {
        type: String,
    },
    tags: [
        {
            type: String,
            ref: "tag",
            trim: true,
        },
    ],
    createdAt: {
        type: Date,

    },
    updatedAt: {
        type: Date,
    },
});

module.exports = mongoose.model("question", questionSchema);
