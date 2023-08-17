const Question = require("../model/question");

const { logFun, error, info } = require("../logger/logger");

const searchMessage = {};
searchMessage.msg = "value for the logger for error and info";
// search question
exports.searchQuestion = async (req, res) => {
    try {
        const question = req.query.tags;
        const searchedData = await Question.aggregate([
            {
                $search: {
                    index: "search-question",
                    text: {
                        query: question,
                        path: "question",
                    },
                },
            },
        ]);

        if (!searchedData) {
            logFun(error, searchMessage.msg = "Data Not Found");
            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, searchMessage.msg = "Qustion searched Successfully");
        return res.status(200).json({
            status: "success",
            message: "Qustion searched Successfully",
            data: searchedData,
        });
    } catch (e) {
        logFun(error.e);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
