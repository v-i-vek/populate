const path = require("path");
const winston = require("winston");
const { format } = require("winston");
/**
 * @type {object} logger => it is define to get the custom
 *  logs which will store in this same folder in which the logger 
 *  is define and the name of file is error.log
 * @const
 */
const logger = winston.createLogger({
    level: "info",
    format: format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.json()),
    defaultMeta: { service: "user-service" },
    transports: [

        new winston.transports.File({ filename: path.join(__dirname, "./error.log"), level: "error" }),
        new winston.transports.File({ filename: path.join(__dirname, "./error.log") }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

/**
 *
 * @param {string} level it will take the value in string the
 *  value will define the type of the logger lever we want
 * @param {string} response it will take the value in string
 *  and the value will concat with the server response
 * @returns {logger.log} it will return the custom log using the winston module
 */

function logFun(level, response) {
    return logger.log(`${level}`, `server response : ${response}`);
}
/**
 * @type {string} it will take the value in string and it is exported to use in project
 */
const info = "info";

/**
 * @type {string} it will take the value in string and it is exported to use in project
 */
const error = "error";

module.exports = {
    logger, logFun, info, error,
};
