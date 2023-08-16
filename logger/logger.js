const path = require("path");
const winston = require("winston");
const { format } = require("winston");

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

function logFun(level, response) {
    return logger.log(`${level}`, `server response : ${response}`);
}

module.exports = { logger, logFun };
