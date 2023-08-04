const Blog = require("../model/blog");
const Document = require("../model/doc");

// update an existing blog
module.exports = {
    approveBlog: async (req, res) => {
        try {
            const { id } = req.params;
            const update = req.body;
            const updateblog = await Blog.findByIdAndUpdate(id, update, {
                new: true,
            });

            if (!updateblog) {
                return res.status(404).json({
                    status: 404,
                    message: "Blog not found!",
                });
            }
            return res.status(201).json({
                status: 201,
                message: "Succesfully approved a blog",
                data: updateblog,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
    approveDocument: async (req, res) => {
        try {
            const { id } = req.params;
            const approve = req.body;
            const approvedoc = await Document.findByIdAndUpdate(id, approve, {
                new: true,
            });

            if (!approvedoc) {
                return res.status(404).json({
                    status: 404,
                    message: "Document not found!",
                });
            }
            return res.status(201).send({
                status: 201,
                message: "Succesfully approved document",
                data: approvedoc,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
    blogs: async (req, res) => {
        try {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 8;
            const pipeline = [
                {
                    $sort: {
                        isApproved: 1,
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
            return res.json(blogs);
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
    getDocument: async (req, res) => {
        try {
            const pageNumber = parseInt(req.query.pageNumber, 10) || 1;
            const pageSize = parseInt(req.query.pageSize, 10) || 5;
            const pipeline = [
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
                        fileName: 1,
                        docData: 1,
                        isApproved: 1,
                        createdDate: 1,
                        "user.firstName": 1,
                        "user.lastName": 1,
                    },
                },
            ];

            const docs = await Document.aggregate(pipeline);
            return res.json(docs);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Server Error",
            });
        }
    },
};
