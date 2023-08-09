/* eslint-disable consistent-return */
const Answer = require("../model/answer");

// creates an answer to that question
exports.addAnswer = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "Data not Found, Payload Not Acceptable",
            });
    }
    let { answer, userId, questionId } = req.body;
    if (answer === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "please enter the answer",
            });
    }
    answer = answer.trim();
    if (answer.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "answer can't be empty",
            });
    }
    if (userId === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "please enter the user Id",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "userId can't be empty",
            });
    }
    if (questionId === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "please enter the Quesiton Id",
            });
    }
    questionId = questionId.trim();
    if (questionId.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "QuestionId can't be empty",
            });
    }
    const addanswer = new Answer({
        userId,
        questionId,
        answer,
    });
    try {
        await addanswer.save();
        return res.status(201).json({
            status: 201,
            message: "Answer Posted successfully",
            data: addanswer,
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            error: "Server Error",
        });
    }
};

// get answer to that question
exports.getAnswerByquestionId = async (req, res) => {
    try {
        let { questionId } = req.params;
        questionId = questionId.trim();
        if (questionId.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid question id",
            });
        }
        const getanswer = await Answer.find({
            questionId: req.params.questionId,
        }).populate([
            {
                path: "userId",
            }, {
                path: "questionId",
            },
        ]);
        return res.status(201).json({
            status: 201,
            message: "Answer get successfully",
            data: getanswer,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// edits the given specific answer
exports.editAnswer = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid  id",
            });
        }
        const editanswer = await Answer.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!editanswer) {
            return res.status(404).json({
                status: 404,
                message: "Answer not found",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Answer Updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// deletes the given specific answer
exports.deleteAnswer = async (req, res) => {
    try {
        // eslint-disable-next-line no-underscore-dangle
        let _id = req.params.id;
        _id = _id.trim();
        if (_id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid  id",
            });
        }
        const deleteanswer = await Answer.findByIdAndDelete(_id);
        if (!deleteanswer) {
            return res.status(404).json({
                status: 404,
                message: "Answer already deleted!",
            });
        }
        return res.status(201).send({
            status: 201,
            message: "Answer deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};

// post upvotes

exports.Upvote = async (req, res) => {
    let answerId = req.params.id;

    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id",
        });
    }

    const userId = req.body.upvotes;

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.upvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { upvotes: userId } },
        );
        res.status(201).json({
            message: "Upvote removed",
        });
    } else {
        await Answer.updateOne(
            { _id: answerId },
            { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } },
        );
        res.status(201).json({
            message: "Upvoted Successfully",
        });
    }
};

// post downvotes

exports.Downvote = async (req, res) => {
    let answerId = req.params.id;
    answerId = answerId.trim();
    if (answerId.length !== 24) {
        return res.status(400).json({
            status: 400,
            message: "Invalid answer id",
        });
    }
    let userId = req.body.downvotes;
    if (userId === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "userId is not defined",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "userId can't be empty",
            });
    }

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.downvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { downvotes: userId } },
        );
        res.status(201).json({
            message: "Downvote removed",
        });
    } else {
        await Answer.updateOne(
            { _id: answerId },
            { $addToSet: { downvotes: userId }, $pull: { upvotes: userId } },
        );
        res.status(201).json({
            message: "Downvoted Successfully",
        });
    }
};

// total upvotes
exports.checkup = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid id",
            });
        }
        const vote = await Answer.find({ _id: id });
        const totalupvote = vote.upvotesLength;
        if (!vote) {
            return res.status(404).send();
        }
        return res.status(201).json({
            message: "success",
            data: totalupvote,
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};

// total downvotes
exports.checkdown = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid id",
            });
        }
        const vote = await Answer.findById(id);
        const totaldownvote = vote.downvotesLength;
        if (!vote) {
            return res.status(404).send();
        }
        return res.status(201).json({
            message: "Success",
            data: totaldownvote,
        });
    } catch (err) {
        return res.status(500).json({
            satus: 500,
            message: "Server Error",
        });
    }
};
