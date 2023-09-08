// eslint-disable-next-line import/no-extraneous-dependencies
const {
    body, validationResult, check, query, param,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require("express-validator");

const addThingValidation = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data can't be empty"),
    check("thingName").exists().withMessage("thingName is required"),
    body("thingName").notEmpty().trim().withMessage("thingName can't be empty"),
    check("location").exists().withMessage("location is required"),
    body("location").notEmpty().trim().withMessage("location can't be empty"),
    check("topicPublish").exists().withMessage("topicPublish is required"),
    body("topicPublish").notEmpty().withMessage("topicPublish is can't be empty"),
    check("topicSubscribe").exists().withMessage("topicSubscribe is required"),
    body("topicSubscribe").notEmpty().withMessage("topicSubscribe is can't be empty"),
    check("temperature").exists().withMessage("temperature is required"),
    body("temperature").notEmpty().withMessage("temperature is can't be empty"),
    check("mode").exists().withMessage("mode is required"),
    body("mode").notEmpty().withMessage("mode is can't be empty"),
    check("sleepTimer").exists().withMessage("sleepTimer is required"),
    body("sleepTimer").notEmpty().withMessage("sleepTimer is can't be empty"),


];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // const extractedErrors = [];
    // errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(401).json({
        status: "failed",
        error: errors.errors[0].msg,
    });
};

module.exports = { validate, addThingValidation };
