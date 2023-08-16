const Blog = require("../model/blog");
const {logFun} = require("../logger/logger");

const info = "info";
const error = "error";
const blogMessage = {};
blogMessage.message = "blog not found"
/**
 *
 * @param {object} req -from the client side
 * @param {object} res -from server side
 * @returns {json}- object in json
 */

// get all posted blogs
exports.blogs = async (req, res) => {
    try {
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 8;
        const pipeline = [
            {
                $match: {
                    isApproved: true,
                },
            },
            {
                $sort: {
                    createdDate: -1,
                },
            },
            {
                $skip: (pageNumber - 1) * pageSize,
            },
            {
                $limit: pageSize,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    content: 1,
                    isApproved: 1,
                    createdDate: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                },
            },
        ];

        const blogs = await Blog.aggregate(pipeline);
        res.json(blogs);
    } catch (err) {
        logFun(error, err)
        res.status(500).json({ error: "Server error" });
    }
};

// get a specific blog
exports.blog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            logFun(error, blogMessage.message="Blog not found!")
            return res.status(404).json({
                status: "failed",
                message: "Blog not found!",
            });
        }
        logFun(info, blogMessage.message="Succesfully got the Blog")
        return res.status(201).send({

            status: "success",
            message: "Succesfully got the Blog",
            data: blog,
        });
    } catch (err) {
        logFun(error, err)
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// post a new blog
exports.createBlog = async (req, res) => {
   

    const { title, content } = req.body;
    const createdDate = Date.now();
    const { userId } = req.body;

    const blog = new Blog({
        userId,
        title,
        content,
        createdDate,
    });
    try {
        await blog.save();
        logFun(info, blogMessage.message="Blog posted successfully")
        return res.status(201).json({
            status: "success",
            message: "Blog posted successfully",
            data: blog,
        });
    } catch (err) {
        logFun(error, error);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// blog get using userId
exports.getBlog = async (req, res) => {
    try {
        const { userId } = req.params;

        const blog = await Blog.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            logFun(error, blogMessage.message="Data not Found")
            return res.status(404).json({
                status: "failed",
                message: "Data not Found",
            });
        }
        logFun(info, blogMessage.message="Blog get successfully")
        return res.status(200).json({
            status: "failed",
            message: " Blog get successfully",
            data: blog,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

exports.getBlogTitle = async (req, res) => {
    try {
        const projection = { title: 1 };
        const blogsd = await Blog.find({ isApproved: true }, projection).exec();
        const blogsData = blogsd.map((btitle) => ({
            title: btitle.title,
        }));
        logFun(info, blogMessage.message = blogsData)
        return res.status(201).json({ blogs: blogsData });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// delete an existing blog
exports.deleteBlog = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid id",
            });
        }
        const deleteblog = await Blog.findByIdAndDelete(id);
        if (!deleteblog) {
            logFun(error, blogMessage.message="Already deleted")
            return res.status(404).json({
                status: "failed",
                message: "Already deleted!",
            });
        }
        logFun(info, blogMessage.message="Succesfully deleted a blog")
        return res.status(201).send({
            status: "success",
            message: "Succesfully deleted a blog",
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// update an existing blog
exports.updateBlog = async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();

        const update = req.body;
        const updatedDate = Date.now();
        const updateblog = await Blog.findByIdAndUpdate(
            id,
            { ...update, updatedDate },
            {
                new: true,
            },
        );

        if (!updateblog) {
            logFun(error, blogMessage.message="Blog not found!")
            return res.status(404).json({
                status: "failed",
                message: "Blog not found!",
            });
        }
        logFun(info, blogMessage.message="Succesfully updated a blog")
        return res.status(201).send({
            status: "success",
            message: "Succesfully updated a blog",
            data: updateblog,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
