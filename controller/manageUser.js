const User = require("../model/user");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");
const Question = require("../model/question");
const Blog = require("../model/blog");
const Doc = require("../model/doc");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const projection = {
                userId: 1, emailId: 1, firstName: 1, lastName: 1,
            };
            const users = await User.find({}, projection).exec();
            if (!users) {
                return res.status(404).json({
                    status: 404,
                    message: "Users not found",
                });
            }
            const usersData = users.map((user) => ({
                // eslint-disable-next-line no-underscore-dangle
                userId: user._id,
                emailId: user.emailId,
                firstName: user.firstName,
                lastName: user.lastName,
            }));
            return res.status(201).json({ users: usersData });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(404).json({
                    status: 404,
                    message: "UserId not found",
                });
            }
            await User.deleteOne({ _id: userId });
            await Bookmark.deleteMany({ userId });
            await Answer.deleteMany({ userId });
            await Question.deleteMany({ userId });
            await Blog.deleteMany({ userId });
            await Doc.deleteMany({ userId });

            return res.status(201).json({
                status: 201,
                message: "User deleted successfully!",
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
};
