const Question = require("../model/question");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");

/**
 *
 *@param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @returns {json}  - return by the server side
 */

// post a question
exports.createQuestion = async (req, res) => {
    try {
        let { userId } = req.body;
        let { question } = req.body;
        let { questionDescribe } = req.body;
        const { tags } = req.body;
        const createdAt = Date.now();

        userId = userId.trim();
        if (userId.length === 0 || userId.length !== 24) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "Invalid user Id",
                });
        }

        if (question === undefined) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "please enter the question ",
                });
        }
        question = question.trim();
        if (question.length === 0) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "question can't be empty",
                });
        }
        if (questionDescribe !== undefined) {
            questionDescribe = questionDescribe.trim();
            if (questionDescribe.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: 406,
                        message: "please describe the question",
                    });
            }
        }
        if (tags !== undefined) {
            if (tags.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: 406,
                        message: "tags can't be empty",
                    });
            }
            if (!Array.isArray(tags)) {
                return res
                    .status(406)
                    .json({
                        status: 406,
                        message: "tags must be in Array with element in string",
                    });
            }
            if (tags.reduce((acc, val) => acc || val.trim() === "", false)) {
                return res
                    .status(406)
                    .json({
                        status: 406,
                        message: "there should not be empty string in array",
                    });
            }
        }
        const questionData = await Question.findOne({ question });

        if (questionData.question === question) {
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
        return res.status(201).json({
            status: 201,
            message: "Question created successfully",
            data: questionCreated,
        });
    } catch (err) {
        console.log(err);
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
            return res.status(404).json({
                status: 404,
                message: "please decrease the limit or page",
            });
        }
        const totalPages = Math.ceil(count / limit);
        const hasMore = page < totalPages;

        if (!questionsData) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Questions Readed successfully",
            data: questionsData,
            nbHits: questionsData.length,
            totalPages,
            hasMore,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
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
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Questions Readed successfully",
            data: questionsData,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
// get a speific question by question id
exports.readByIdQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid id from params",
            });
        }
        const questionData = await Question.findById({ _id: id }).populate([
            {
                path: "userId",
            },
        ]);
        if (!questionData) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Question Readed successfully",
            data: questionData,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
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
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Question Readed successfully",
            data: questionData,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// update perticular question
exports.updateQuestion = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "Data not Found, Payload Not Acceptable",
                });
        }

        let { id } = req.params;
        const update = req.body;
        const updatedAt = Date.now();

        id = id.trim();
        if (id.length !== 24) {
            return res.status(402).json({
                status: 402,
                message: "please enter a valid id",
            });
        }
        const updateQuestion = await Question.findByIdAndUpdate(id, { ...update, updatedAt }, {
            new: true,
        });

        if (!updateQuestion) {
            return res.status(404).json({
                status: 404,
                message: "Data Not Found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Question Updated Successfully",
            data: updateQuestion,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// delete perticular question
exports.deleteQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(401).json({
                status: 401,
                message: "invalid user Id",
            });
        }
        await Question.findByIdAndDelete(id);
        await Bookmark.deleteMany({ questionId: id });
        await Answer.deleteMany({ questionId: id });
        return res.status(200).json({
            status: 200,
            message: "Question Deleted Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
