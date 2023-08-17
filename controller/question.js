const Question = require("../model/question");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");
const { logFun, error, info } = require("../logger/logger");

const questionMessage = {};
questionMessage.msg = "value for the logger for error and info";

/**
 *
 *@param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @returns {json}  - return by the server side
 */

// post a question
exports.createQuestion = async (req, res) => {
    try {
        const { userId } = req.body;
        const { question } = req.body;
        const { questionDescribe } = req.body;
        const { tags } = req.body;
        const createdAt = Date.now();

        const questionData = await Question.findOne({ question });

        if (questionData === question) {
            logFun(error, questionMessage.msg = "Question already exist");
            return res.status(400).json({
                status: 400,
                message: "Question already exist",
            });
        }
        const questionCreated = new Question({
            userId,
            question,
            tags,
            questionDescribe,
            createdAt,
        });
        await questionCreated.save();
        logFun(info, questionMessage.msg = "Question created successfully");
        return res.status(201).json({
            status: 201,
            message: "Question created successfully",
            data: questionCreated,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
/**
 *
 * @param {} req
 * @param {*} res
 * @returns
 */
// question pagination
exports.questionPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
        const skip = (page - 1) * limit;

        const questionsData = await Question.find()
            .skip(skip)
            .limit(limit)
            .populate([
                {
                    path: "userId",
                },
            ]);
        const count = await Question.countDocuments();
        const check = page * limit;
        if (check > count) {
            logFun(error, questionMessage.msg = "please decrease the limit or page");
            return res.status(404).json({
                status: "failed",
                message: "please decrease the limit or page",

            });
        }
        const totalPages = Math.ceil(count / limit);
        const hasMore = page < totalPages;

        if (!questionsData) {
            logFun(error, questionMessage.msg = "Data Not Found");

            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, questionMessage.msg = "Questions Readed successfully");

        return res.status(200).json({
            status: "success",
            message: "Questions Readed successfully",
            data: questionsData,
            nbHits: questionsData.length,
            totalPages,
            hasMore,
        });
    } catch (err) {
        logFun(error, err);

        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// read the questions from database
exports.readQuestions = async (req, res) => {
    try {
        const questionsData = await Question.find().populate([
            {
                path: "userId",
            },
        ]);
        if (!questionsData) {
            logFun(error, questionMessage.msg = "Data Not Found");

            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, questionMessage.msg = "Questions Readed successfully");

        return res.status(200).json({
            status: "success",
            message: "Questions Readed successfully",
            data: questionsData,
        });
    } catch (err) {
        logFun(error, err);

        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
// get a speific question by question id
exports.readByIdQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const questionData = await Question.findById({ _id: id }).populate([
            {
                path: "userId",
            },
        ]);
        if (!questionData) {
            logFun(error, questionMessage.msg = "Data Not Found");

            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, questionMessage.msg = "Question Readed successfully");

        return res.status(200).json({
            status: "success",
            message: "Question Readed successfully",
            data: questionData,
        });
    } catch (err) {
        logFun(error, err);

        console.log(err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// get a speific question by user id
exports.readByIdUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const questionData = await Question.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);
        if (!questionData) {
            logFun(error, questionMessage.msg = "Data Not Found");

            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, questionMessage.msg = "Question Read successfully");

        return res.status(200).json({
            status: 200,
            message: "Question Read successfully",
            data: questionData,
        });
    } catch (err) {
        logFun(error, err);

        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// update perticular question
exports.updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const updatedAt = Date.now();

        const updateQuestion = await Question.findByIdAndUpdate(id, { ...update, updatedAt }, {
            new: true,
        });

        if (!updateQuestion) {
            logFun(error, questionMessage.msg = "Data Not Found");

            return res.status(404).json({
                status: "failed",
                message: "Data Not Found",
            });
        }
        logFun(info, questionMessage.msg = "Question Updated Successfully");
        return res.status(200).json({
            status: "success",
            message: "Question Updated Successfully",
            data: updateQuestion,
        });
    } catch (err) {
        logFun(error, err);

        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// delete perticular question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            logFun(error, questionMessage.msg = "question not exist");

            return res.status(401).json({
                status: "fail",
                message: "question not exist",
            });
        }
        await Bookmark.deleteMany({ questionId: id });
        await Answer.deleteMany({ questionId: id });
        logFun(info, questionMessage.msg = "Question Deleted Successfully");

        return res.status(200).json({
            status: "success",
            message: "Question Deleted Successfully",
        });
    } catch (err) {
        logFun(error, err);

        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
