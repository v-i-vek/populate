const Question = require("../model/question");

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
            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Qustion searched Successfully",
            data: searchedData,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
