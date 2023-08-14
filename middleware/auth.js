const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../logger/logs");
/**
 *
 * @param {object} req - provided by the client side
 * @param {object} res - provided by the erver side
 * @param {Function} next -it is function, will execute to the next from current function
 * @returns {json}  - return by the server side
 */

exports.auth = async (req, res, next) => {
    let check = req.headers.cookie;
    console.log(req);
    console.log(check, "==============");
    if (check === undefined) {
        const response = res.status(401).json({
            status: 401,
            message: "Need to Sign In",
        });

        return response;
    }
    // console.log(typeof check);
    console.log(check, "this is check");
    check = check.slice(4, check.length);

    const token = check;
    console.log(token, "this is the token");
    if (!token) {
        const response = res.status(401).json({
            status: 401,
            message: "Need to Sign In",
        });
        console.log(response);
        logger.information(response);

        return response;
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
    } catch (err) {
        logger.errors(err);
        return res.status(401).json({
            status: 401,
            message: "You are not authorized",
        });
    }
    return next();
};
