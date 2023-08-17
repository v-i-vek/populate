const multer = require("multer");

const multerStorage = multer.memoryStorage();

// Multer Filter
/**
 *This function will use to add pdf through body in database
 * @param {object} req - from client side
 * @param {BinaryData} file -from client side
 * @param {Function} cb -it is callback function
 */
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
};

// Calling the "multer" Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single("file");

module.exports = upload;
