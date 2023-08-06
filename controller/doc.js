const Document = require("../model/doc");

// get all posted documents
exports.getDocument = async (req, res) => {
    try {
        const docsdata = await Document.find().populate([
            {
                path: "userId",
            },
        ]);
        console.log(docsdata);
        return res.status(201).json({
            status: 201,
            message: "Succesfully got all Documents",
            data: docsdata,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// get a specific document
exports.getDocuments = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, "this is the document id");
        const doc = await Document.findById(id).populate([
            {
                path: "userId",
            },
        ]);
        console.log(doc);
        if (!doc) {
            return res.status(404).json({
                status: 404,
                message: "Document not found!",
                detail: "We cannot find the page you are looking for.",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Succesfully got the Document",
            data: doc,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// post a new document

exports.postDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 400,
            error: "No file uploaded",
        });
    }
    try {
        const userId = req.body.user;
        const fileName = req.file.originalname;
        const fileType = req.file.mimetype;
        const docData = req.file.buffer;
        const document = await Document.create({
            fileName,
            fileType,
            docData,
            userId,
        });
        return res.status(201).json({
            status: 201,
            message: "Succesfully posted a Document",
            data: document,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};

// delete an existing document
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteD = await Document.findByIdAndDelete(id);
        if (!deleteD) {
            return res.status(404).json({
                status: 404,
                message: "Already deleted!",
                detail: "Document has already been deleted.",
            });
        }
        return res.status(201).json({
            status: 201,
            message: "Succesfully deleted Document",
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
        });
    }
};
