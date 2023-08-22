/* eslint-disable consistent-return */
const logger = require("../logger/logger");
const Answer = require("../model/answer");
const { logFun, info, error } = require("../logger/logger");

/**
 *@type {object}  The below object is created to add the custom message for the log file
*@const
 */

const ans = {};
ans.message = "answer get successfully";
/**
 *This function is to add  add the answer of the respected questinId
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @returns {json}  - return by the server side
 */// creates an answer to that question
exports.addAnswer = async (req, res) => {
    const { answer, userId, questionId } = req.body;

    try {
        const addanswer = new Answer({
            userId,
            questionId,
            answer,

        });
        const result = await addanswer.save();
        logFun(info, result);
        return res.status(201).json({
            status: "success",
            message: "Answer Posted successfully",
            data: addanswer,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            satus: "failed",
            error: "Server Error",
        });
    }
};

/**
 *This function is to get the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// get answer to that question
exports.getAnswerByquestionId = async (req, res) => {
    try {
        const getanswer = await Answer.find({ questionId: req.params.questionId }).populate([
            {
                path: "userId",
            }, {
                path: "questionId",
            },
        ]);

        logFun(info, ans.message = "Answer get successfully");
        return res.status(201).json({
            status: "success",
            message: "Answer get successfully",
            data: getanswer,
        });
    } catch (err) {
        logFun("error", err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

/**
 *This function is to edit the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */

// edits the given specific answer
exports.editAnswer = async (req, res) => {
    try {
        console.log("=======================");
        const { id } = req.params;

        const editanswer = await Answer.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!editanswer) {
            ans.message = "Answer not Found";
            logFun(info, ans.message);
            return res.status(404).json({
                status: 404,
                message: "Answer not found",
            });
        }
        ans.message = "Answer Updated successfully";
        logFun(info, ans.message);
        return res.status(201).json({
            status: "success",
            message: "Answer Updated successfully",
        });
    } catch (err) {
        logFun("error", err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
/**
 *This function is to delete the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// deletes the given specific answer
exports.deleteAnswer = async (req, res) => {
    try {
        // eslint-disable-next-line no-underscore-dangle
        let _id = req.params.id;
        _id = _id.trim();

        const deleteanswer = await Answer.findByIdAndDelete(_id);
        if (!deleteanswer) {
            ans.message = "Answer already deleted!";
            logFun(info, ans.message);
            return res.status(404).json({
                status: 404,
                message: "Answer already deleted!",
            });
        }
        ans.message = "Answer deleted successfully";
        logFun(info, ans.message);
        return res.status(201).send({
            status: "success",
            message: "Answer deleted successfully",
        });
    } catch (err) {
        logFun("error", err);
        return res.status(500).json({
            satus: "failed",
            message: "Server Error",
        });
    }
};

/**
 *This function is to upvote the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// post upvotes

exports.Upvote = async (req, res) => {
    const answerId = req.params.id;

    const userId = req.body.upvotes;

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.upvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { upvotes: userId } },
        );
        logFun(info, ans.message = "Upvote removed");
        res.status(201).json({
            message: "Upvote removed",
        });
    } else {
        await Answer.updateOne(
            { _id: answerId },
            { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } },
        );
        logFun(info, ans.message = "Upvoted Successfully");
        res.status(201).json({
            message: "Upvoted Successfully",
        });
    }
};
/**
 *This function is to downvote the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// post downvotes

exports.Downvote = async (req, res) => {
    let answerId = req.params.id;
    answerId = answerId.trim();

    let userId = req.body.downvotes;

    userId = userId.trim();

    const vote = await Answer.findOne({ _id: answerId });
    if (vote.downvotes.includes(userId)) {
        await Answer.updateOne(
            { _id: answerId },
            { $pull: { downvotes: userId } },
        );
        logFun(info, ans.message = "Downvote removed");
        res.status(201).json({
            message: "Downvote removed",
        });
    } else {
        await Answer.updateOne(
            { _id: answerId },
            { $addToSet: { downvotes: userId }, $pull: { upvotes: userId } },
        );
        logFun(info, ans.message = "Downvoted Successfully");
        res.status(201).json({
            message: "Downvoted Successfully",
        });
    }
};

/**
 *This function is to get total votes the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// total upvotes
exports.checkup = async (req, res) => {
    try {
        const { id } = req.params;
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
        logFun("error", err);
        return res.status(500).json({
            satus: "failed",
            message: "Server Error",
        });
    }
};
/**
 *This function is to get total downvotes the answer by id
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the server side
 * @returns {json}  - return by the server side
 */
// total downvotes
exports.checkdown = async (req, res) => {
    try {
        const { id } = req.params;
        const vote = await Answer.findById(id);
        const totaldownvote = vote.downvotesLength;
        if (!vote) {
            return res.status(404).send();
        }
        logFun(info, ans.message = "Success");
        return res.status(201).json({
            message: "Success",
            data: totaldownvote,
        });
    } catch (err) {
        logger.log("error", err);
        return res.status(500).json({
            satus: "failed",
            message: "Server Error",
        });
    }
};
