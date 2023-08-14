const {
    body, validationResult, check, query, param,
} = require("express-validator");

const userValidationRules = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("firstName").exists().withMessage("firstname is required"),
    check("lastName").exists().withMessage("lastName is required"),
    check("emailId").exists().withMessage("emailId is required"),
    check("password").exists().withMessage("password is required"),
    check("confirmPassword").exists().withMessage("confirmPassword is required"),

    body("firstName").notEmpty().trim().withMessage("firstname can't be empty"),
    body("lastName").notEmpty().trim().withMessage("lastName can't be empty"),
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
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("emailId").exists().withMessage("emailId is required"),
    check("password").exists().withMessage("password is required"),
    body("emailId").notEmpty().trim().isEmail()
        .withMessage("enter valid email address"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("password must be atleast 6 character long"),
];

const searchValidation = () => [
    query("tags").notEmpty().withMessage("enter the tag"),
];

const questionValidate = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId is requried"),
    body("userId").notEmpty().trim().isLength({ min: 24 })
        .withMessage("user id userid have the length of 24")
        .isLength({ max: 24 })
        .withMessage("userid must be equal to 24"),
    check("question").exists().withMessage("question is required"),
    body("question").notEmpty().trim().withMessage("question can't be empty"),

];
const anwerValidatePost = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
    check("userId").exists().withMessage("userId is required"),
    body("userId").notEmpty().trim().isLength(24)
        .withMessage("userId must have 24 character"),
    check("questionId").exists().withMessage("questionId is required"),
    body("questionId").notEmpty().trim().isLength(24)
        .withMessage("questionId must have 24 character"),
    check("answer").exists().withMessage(" answer is required"),
    body("answer").notEmpty().trim().withMessage("enter answer of the question"),
];

const answerValidateGetById = () => [
    param("id").notEmpty().withMessage("enter answerId in params").trim()
        .isLength({ min: 24 })
        .withMessage("Id must have length 24")
        .isLength({ max: 24 })
        .withMessage("Id must have length 24"),
];
const answerValidatePatch = () => [
    query("Id").notEmpty().trim().isLength(24)
        .withMessage("question id can't be empty and must have 24 character"),
];
const blogIdValidate = () => [
    query("userId").notEmpty().trim().isLength(24)
        .withMessage("question id can't be empyt and must have 24 character"),
];

const blogValidatePost = () => [
    body().custom((value, { req }) => Object.keys(req.body).length !== 0).withMessage("Data Not found"),
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
    return res.status(401).json({
        status: "failed",
        error: errors.errors[0].msg,
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
