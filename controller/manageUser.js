const User = require("../model/user");
const Bookmark = require("../model/bookmark");
const Answer = require("../model/answer");
const Question = require("../model/question");
const Blog = require("../model/blog");
const Doc = require("../model/doc");
const { logFun, error, info } = require("../logger/logger");
/**
 *@type {object}  The below object is created to add the custom message for the log file
*@const
 */
const manageUser = {};
manageUser.msg = "value for the value";
module.exports = {
    /**
     * This funciton is used to get all the user at a time
     * @param {object} req  client will provide the request
     * @param {object} res  server will response according to the request
     * @returns {json}      server will return the json object as response
     */
    getAllUsers: async (req, res) => {
        try {
            const projection = {
                userId: 1, emailId: 1, firstName: 1, lastName: 1,
            };
            const users = await User.find({}, projection).exec();
            if (!users) {
                logFun(error, manageUser.msg = "Users not found");
                return res.status(404).json({
                    status: "failed",
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
            logFun(info, usersData);
            return res.status(201).json({ status: "success", users: usersData });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    /**
     * This funciton is used to delete the user by there id
     * @param {object} req  client will provide the request
     * @param {object} res  server will response according to the request
     * @returns {json}      server will return the json object as response
     */
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                logFun(error, manageUser.msg = "Users not found");
                return res.status(404).json({
                    status: "failed",
                    message: "UserId not found",
                });
            }
            await User.deleteOne({ _id: userId });
            await Bookmark.deleteMany({ userId });
            await Answer.deleteMany({ userId });
            await Question.deleteMany({ userId });
            await Blog.deleteMany({ userId });
            await Doc.deleteMany({ userId });
            logFun(info, manageUser.msg = "User deleted successfully!");
            return res.status(201).json({
                status: "success",
                message: "User deleted successfully!",
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
