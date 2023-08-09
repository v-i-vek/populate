const Blog = require("../model/blog");

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
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// get a specific blog
exports.blog = async (req, res) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            return res.status(401).json({
                status: 401,
                message: "Invalid Id in Params",
            });
        }
        const blog = await Blog.findById(id).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found!",
            });
        }
        return res.status(201).send({
            status: 201,
            message: "Succesfully got the Blog",
            data: blog,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// post a new blog
exports.createBlog = async (req, res) => {
    console.log("this is callled");
    if (Object.keys(req.body).length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "Data not Found, Payload Not Acceptable",
            });
    }
    let { title, content } = req.body;
    const createdDate = Date.now();
    let { userId } = req.body;
    if (userId === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "userId is not defined",
            });
    }
    userId = userId.trim();
    if (userId.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "please enter valid user Id",
            });
    }
    if (title === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "please enter the title of the blog",
            });
    }
    title = title.trim();
    if (title.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "Title can't be empty ",
            });
    }
    if (content === undefined) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "Please enter the content of the blog",
            });
    }
    content = content.trim();
    if (content.length === 0) {
        return res
            .status(406)
            .json({
                status: 406,
                message: "content can't be empty",
            });
    }

    const blog = new Blog({
        userId,
        title,
        content,
        createdDate,
    });
    try {
        await blog.save();
        return res.status(201).json({
            status: 201,
            message: "Blog posted successfully",
            data: blog,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// blog get using userId
exports.getBlog = async (req, res) => {
    try {
        let { userId } = req.params;

        userId = userId.trim();
        if (userId.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Id in params",
            });
        }
        const blog = await Blog.find({ userId }).populate([
            {
                path: "userId",
            },
        ]);
        if (!blog) {
            return res.status(404).json({
                status: 404,
                message: "Data not Found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: " Blog get successfully",
            data: blog,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
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
        return res.status(201).json({ blogs: blogsData });
    } catch (err) {
        return res.status(500).json({
            status: 500,
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
                status: 400,
                message: "Invalid id",
            });
        }
        const deleteblog = await Blog.findByIdAndDelete(id);
        if (!deleteblog) {
            return res.status(404).json({
                status: 404,
                message: "Already deleted!",
            });
        }
        return res.status(201).send({
            status: 201,
            message: "Succesfully deleted a blog",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// update an existing blog
exports.updateBlog = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res
                .status(406)
                .json({
                    status: 406,
                    message: "Data not Found, Payload Not Acceptable",
                });
        }

        let { id } = req.params;
        id = id.trim();
        if (id.length !== 24) {
            return res.status(400).json({
                status: 400,
                message: "Invalid id",
            });
        }
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
            return res.status(404).json({
                status: 404,
                message: "Blog not found!",
            });
        }
        return res.status(201).send({
            status: 201,
            message: "Succesfully updated a blog",
            data: updateblog,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
