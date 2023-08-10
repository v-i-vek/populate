const { body, validationResult } = require("express-validator");

const userValidationRules = () => [
    body("firstName").notEmpty().trim(),
    body("lastName").notEmpty().trim(),
    body("emailId").notEmpty().trim().isEmail()
        .withMessage("enter your valid email"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("min length of password with 6 character"),
];

const signInValidation = () => [
    body("email").isEmail().withMessage("enter valid email address"),
    body("password").isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    userValidationRules,
    validate,
    signInValidation,
};
