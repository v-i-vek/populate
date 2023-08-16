const Bookmark = require("../model/bookmark");
const logger = require("../logger/logger");

/**
 *
 */

module.exports = {
    addBookmark: async (req, res) => {
        try {
            if (Object.keys(req.body).length === 0) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "Data not Found, Payload Not Acceptable",
                    });
            }
            let userId = await req.body.userId;
            let { questionId } = req.body;
            if (userId === undefined) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "userId is not defined",
                    });
            }
            userId = userId.trim();
            if (userId.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "please enter valid user Id",
                    });
            }
            if (questionId === undefined) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "please enter the Quesiton Id",
                    });
            }
            questionId = questionId.trim();
            if (questionId.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "QuestionId can't be empty",
                    });
            }
            const addedBookmark = await Bookmark.findOne({ userId, questionId });

            if (addedBookmark) {
                // eslint-disable-next-line no-underscore-dangle
                await Bookmark.findByIdAndDelete(addedBookmark._id);
                return res.status(200).json({
                    status: "success",
                    message: "Bookmark removed",
                });
            }
            const bookmark = new Bookmark({ userId, questionId });
            await bookmark.save();
            return res.status(201).json({
                status: "success",
                message: "Added bookmark",
                data: bookmark,
            });
        } catch (err) {
            logger.log("error", err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },

    getmanageBookmarkById: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookmarks = await Bookmark.find({ userId }).populate([
                {
                    path: "questionId",
                    populate: {
                        path: "userId",
                        model: "user",
                    },
                },
            ]);
            return res.status(200).json({
                status: "success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            logger.log("error", err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },

    getBookmarkByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookmarks = await Bookmark.find({ userId });
            return res.status(200).json({
                status: "success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            logger.log("error", "failed");
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
};
