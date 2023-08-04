const Bookmark = require("../model/bookmark");

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
                    status: 200,
                    message: "Bookmark removed",
                });
            }
            const bookmark = new Bookmark({ userId, questionId });
            await bookmark.save();
            return res.status(201).json({
                status: 201,
                message: "Added bookmark",
                data: bookmark,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
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
                status: 200,
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },

    getBookmarkByUserId: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookmarks = await Bookmark.find({ userId });
            return res.status(200).json({
                status: 200,
                message: "Bookmarks",
                data: bookmarks,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
};
