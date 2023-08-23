const jwt = require("jsonwebtoken");
require("dotenv").config();
const { logFun, error } = require("../logger/logger.js");
/**
 *@type {object}  The below object is created to add the custom message for the log file
*@const
 */
const authMessage = {};
authMessage.msg = "This is for the value of the function logFun to get error or info";
/**
 *This will work as middelware and will check if the requested user is valid or not
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @param {Function} next -next() : It will run or execute the code after all
 *  the middleware function is finished.
 * @returns {json}  - return by the server side
 */

exports.auth = async (req, res, next) => {
    console.log("____________________-+=====================",req.headers)
    let check = req.headers.cookie;

    if (check === undefined) {
        logFun(error, authMessage.msg = "Need to Sign In");
        return res.status(401).json({
            status: "failed",
            message: "Need to Sign In",
        });
    }
    check = check.slice(4, check.length);

    const token = check;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
    } catch (err) {
        logFun(error, err);
        return res.status(401).json({
            status: "failed",
            message: "You are not authorized",
        });
    }
    return next();
};
