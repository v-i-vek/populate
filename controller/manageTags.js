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
                        status: 406,
                        message: "Tag is undefined",
                    });
            }
            tag = tag.trim();
            if (tag.length === 0) {
                return res
                    .status(406)
                    .json({
                        status: 406,
                        message: "tag Can't be empty",
                    });
            }

            const newTag = new Tag({ name: tag });
            await newTag.save();
            return res.status(201).json({
                status: 201,
                message: "Added Tag",
                data: newTag,
            });
        } catch (err) {
            if (err instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid Tag",
                });
            }
            return res.status(500).json({
                status: 500,
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
            return res.status(201).json({ tags: allTags });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },

    deleteTag: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({
                    status: 404,
                    message: "Tag Id not found",
                });
            }
            const tag = await Tag.findByIdAndDelete({ _id: id });
            if (!tag) {
                return res.status(404).json({
                    status: 404,
                    message: "Tag not found",
                });
            }
            return res.status(201).json({
                status: 201,
                message: "Tag deleted",
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
};
