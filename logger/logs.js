const logger = require("./logger");

/**
 *
 * @param {object} res this will give the information about object
 */

function information(res) {
    logger.log("info", `Server Response ${res}`);
}

function errors(res) {
    logger.log("error", `Server Response ${res}`);
}

module.exports = { information, errors };
