const Document = require("../model/doc");
const { logFun, error, info } = require("../logger/logger");

const documentMessage = {};
documentMessage.msg = "value for the value";
/**
 *
 *@param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @returns {json}  - return by the server side
 */

// get all posted documents
exports.getDocument = async (req, res) => {
    try {
        const docsdata = await Document.find().populate([
            {
                path: "userId",
            },
        ]);
        logFun(info, documentMessage.msg = "Succesfully got all Documents");
        return res.status(201).json({
            status: "success",
            message: "Succesfully got all Documents",
            data: docsdata,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// get a specific document
exports.getDocuments = async (req, res) => {
    try {
        const { id } = req.params;

        const doc = await Document.findById(id).populate([
            {
                path: "userId",
            },
        ]);

        if (!doc) {
            logFun(info, documentMessage.msg = "Document not found!");
            return res.status(404).json({
                status: "failed",
                message: "Document not found!",
                detail: "We cannot find the page you are looking for.",
            });
        }
        logFun(info, documentMessage.msg = "Succesfully got the Document");
        return res.status(201).json({
            status: "success",
            message: "Succesfully got the Document",
            data: doc,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};

// post a new document

exports.postDocument = async (req, res) => {
    if (!req.file) {
        logFun(error, documentMessage.msg = "No file uploaded");
        return res.status(400).json({
            status: "failed",
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
        logFun(info, documentMessage.msg = "Succesfully posted a Document");
        return res.status(201).json({
            status: "success",
            message: "Succesfully posted a Document",
            data: document,
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
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
            logFun(error, documentMessage.msg = "Already deleted!");
            return res.status(404).json({
                status: "failed",
                message: "Already deleted!",
                detail: "Document has already been deleted.",
            });
        }
        logFun(error, documentMessage.msg = "Succesfully deleted Document");
        return res.status(201).json({
            status: "success",
            message: "Succesfully deleted Document",
        });
    } catch (err) {
        logFun(error, err);
        return res.status(500).json({
            status: "failed",
            message: "Server Error",
        });
    }
};
