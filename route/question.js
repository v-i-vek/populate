const express = require("express");

const questionRouter = new express.Router();
const questionController = require("../controller/question");
const auth = require("../middleware/auth");
const validate = require("../middleware/validator");

questionRouter.post("/question", validate.questionValidate(), validate.validate, auth.auth, questionController.createQuestion);

questionRouter.get("/question", questionController.readQuestions);

questionRouter.get("/quepagination", questionController.questionPagination);

questionRouter.get("/question/:id", validate.answerValidateGetById(),validate.validate, questionController.readByIdQuestion);

questionRouter.get("/questionbyuser/:userId", validate.blogIdValidate,validate.validate, auth.auth, questionController.readByIdUser);

questionRouter.patch("/question/:id", validate.answerValidateGetById(),validate.validate, auth.auth, questionController.updateQuestion);

questionRouter.delete("/question/:id", validate.answerValidateGetById, validate.validate, auth.auth, questionController.deleteQuestion);

module.exports = questionRouter;
