const Bookmark = require("../model/bookmark");
const { logFun, info, error } = require("../logger/logger");

const bookmarkMessage = {};
bookmarkMessage.msg = "value of the value";

/**
 *
 */

module.exports = {
    addBookmark: async (req, res) => {
        try {
            const userId = await req.body.userId;
            const { questionId } = req.body;
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
            logFun(error, err);
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
            logFun(info, bookmarkMessage.msg = "Bookmarks");
            return res.status(200).json({
                status: "success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            logFun(error, err);
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
            logFun(error, bookmarkMessage.msg = "Bookmarks");
            return res.status(200).json({
                status: "success",
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
};
