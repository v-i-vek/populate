const {
    body, validationResult, check, query,
} = require("express-validator");

const userValidationRules = () => [
    body("firstName").notEmpty().trim(),
    body("lastName").notEmpty().trim(),
    body("emailId").notEmpty().trim().isEmail()
        .withMessage("enter your valid email")
        .custom((value) => {
            if (!value.endsWith("@gmail.com")) {
                throw new Error("Email must end with @gmail.com");
            }
            return true;
        }),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("min length of password with 6 character")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .withMessage("password must have one Uppercase One loweCase One number One special charater"),
    check("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("password and confirm password are not matching"),
];

const signInValidation = () => [
    body("emailId").notEmpty().trim().isEmail()
        .withMessage("enter valid email address"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
];

const searchValidation = () => [
    query("tags").notEmpty().withMessage("enter the tag"),
];

const questionValidate = () => [
    body("userId").notEmpty().isLength(24).withMessage("userId must have length of 24"),
    body("question").notEmpty().trim(),
    // body("questionDescribe"),
    body("tags").trim(),
];
const anwerValidatePost = () => [
    body("userId").notEmpty().trim().isLength(24)
        .withMessage("userId must have 24 character"),
    body("questionId").notEmpty().trim().isLength(24)
        .withMessage("questionId must have 24 character"),
    body("answer").notEmpty().trim().withMessage("enter answer of the question"),
];

const answerValidateGetById = () => [
    query("questionId").notEmpty().trim().isLength(24)
        .withMessage("question id can't be empyt and must have 24 character"),
];
const answerValidatePatch = () => [
    query("Id").notEmpty().trim().isLength(24)
        .withMessage("question id can't be empyt and must have 24 character"),
];
const blogIdValidate = () => [
    query("userId").notEmpty().trim().isLength(24)
        .withMessage("question id can't be empyt and must have 24 character"),
];

const blogValidatePost = () => [
    body("title").notEmpty().trim().withMessage("title can't be empty"),
    body("content").notEmpty().trim().withMessage("content can't be empty"),
    body("userId").notEmpty().trim().isLength(24)
        .withMessage("must have the lenght of 24"),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    // const extractedErrors = [];
    // errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
    return res.status(422).json({
        errors,
    });
};

module.exports = {
    userValidationRules,
    validate,
    signInValidation,
    searchValidation,
    questionValidate,
    anwerValidatePost,
    answerValidateGetById,
    answerValidatePatch,
    blogValidatePost,
    blogIdValidate,
};
