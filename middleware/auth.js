const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    // const check = req.headers.cookie;
    // console.log(typeof check);
    // const token = check.slice(4, check.length);
    const token = req.headers.cookie;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Need to Sign In",
        });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: "You are not authorized",
        });
    }
    return next();
};
