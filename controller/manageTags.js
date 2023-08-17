const { default: mongoose } = require("mongoose");
const Tag = require("../model/tag");
const { logFun, error, info } = require("../logger/logger");
/**
 *@type {object}  The below object is created to add the custom message for the log file
*@const
 */
const manageTagMessage = {};
manageTagMessage.msg = "value for the value";
module.exports = {
    /**
     * This funciton is used to add TAGs
     * @param {object} req  client will provide the request
     * @param {object} res  server will response according to the request
     * @returns {json}      server will return the json object as response
     */
    addTag: async (req, res) => {
        try {
            const tag = req.body.name;

            const newTag = new Tag({ name: tag });
            await newTag.save();
            logFun(info, manageTagMessage.msg = "Added Tag");
            return res.status(201).json({
                status: "success",
                message: "Added Tag",
                data: newTag,
            });
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                logFun(err, manageTagMessage.msg = "Invalid Tag");
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid Tag",
                });
            }
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: `Internal Server Error: ${err.message}`,
            });
        }
    },
    /**
     * This funciton is used to get all TAGs
     * @param {object} req  client will provide the request
     * @param {object} res  server will response according to the request
     * @returns {json}      server will return the json object as response
     */

    getAllTags: async (req, res) => {
        try {
            const projection = { name: 1 };
            const tags = await Tag.find({}, projection).exec();
            const allTags = tags.map((tag) => ({
                tag: tag.name,
                // eslint-disable-next-line no-underscore-dangle
                id: tag._id,
            }));
            logFun(info, allTags);
            return res.status(201).json({ status: "success", tags: allTags });
        } catch (err) {
            logFun(error, err);
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    /**
     * This funciton is used to delete TAGs by its id
     * @param {object} req  client will provide the request
     * @param {object} res  server will response according to the request
     * @returns {json}      server will return the json object as response
     */
    deleteTag: async (req, res) => {
        try {
            const { id } = req.params;

            const tag = await Tag.findByIdAndDelete({ _id: id });
            if (!tag) {
                logFun(error, manageTagMessage.msg = "Tag not found");
                return res.status(404).json({
                    status: "failed",
                    message: "Tag not found",
                });
            }
            logFun(info, manageTagMessage.msg = "Tag deleted");
            return res.status(201).json({
                status: "success",
                message: "Tag deleted",
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
