const { default: mongoose } = require("mongoose");
const Tag = require("../model/tag");

module.exports = {
    addTag: async (req, res) => {
        try {
            let tag = req.body.name;
            if (tag === undefined) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "Tag is undefined",
                    });
            }
            tag = tag.trim();
            if (tag.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: "failed",
                        message: "tag Can't be empty",
                    });
            }

            const newTag = new Tag({ name: tag });
            await newTag.save();
            return res.status(201).json({
                status: "success",
                message: "Added Tag",
                data: newTag,
            });
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({
                    status: "failed",
                    message: "Invalid Tag",
                });
            }
            return res.status(500).json({
                status: "failed",
                message: `Internal Server Error: ${err.message}`,
            });
        }
    },
    getAllTags: async (req, res) => {
        try {
            const projection = { name: 1 };
            const tags = await Tag.find({}, projection).exec();
            const allTags = tags.map((tag) => ({
                tag: tag.name,
                // eslint-disable-next-line no-underscore-dangle
                id: tag._id,
            }));
            return res.status(201).json({ status: "success", tags: allTags });
        } catch (err) {
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },

    deleteTag: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({
                    status: "failed",
                    message: "Tag Id not found",
                });
            }
            const tag = await Tag.findByIdAndDelete({ _id: id });
            if (!tag) {
                return res.status(404).json({
                    status: "failed",
                    message: "Tag not found",
                });
            }
            return res.status(201).json({
                status: "success",
                message: "Tag deleted",
            });
        } catch (err) {
            return res.status(500).json({
                status: "failed",
                message: "Server Error",
            });
        }
    },
};
