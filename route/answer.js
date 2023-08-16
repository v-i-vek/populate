const express = require("express");

const answerRoutes = express.Router();
const answerController = require("../controller/answer");
const auth = require("../middleware/auth");
const validate = require("../middleware/validator");

answerRoutes.post("/answer", validate.anwerValidatePost(), validate.validate, auth.auth, answerController.addAnswer);
answerRoutes.get("/answer/:questionId", validate.answerValidateGetQuestionById(), validate.validate, answerController.getAnswerByquestionId);
answerRoutes.patch("/answer/:id",validate.updateAnswerValidation(),validate.validate, auth.auth, answerController.editAnswer);
answerRoutes.delete("/answer/:id", validate.answerValidateGetById(), validate.validate, auth.auth, answerController.deleteAnswer);
answerRoutes.post("/upvote/:id", validate.answerValidateGetById(), validate.validate, auth.auth, answerController.Upvote);
answerRoutes.post("/downvote/:id", validate.answerValidateGetById(), validate.validate, auth.auth, answerController.Downvote);
answerRoutes.get("/upvote/:id", validate.answerValidateGetById(), validate.validate, auth.auth, answerController.checkup);
answerRoutes.get("/downvote/:id", validate.answerValidateGetById(), validate.validate, auth.auth, answerController.checkdown);

module.exports = answerRoutes;
