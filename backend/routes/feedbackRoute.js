const express = require("express");
const {
  getFeedback,
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deletFeedback,
} = require("../services/feedbackServices.js");

const {
  getFeedbackValidator,
  createFeedbackValidator,
  updateFeedbackValidator,
  deleteFeedbackValidator,
} = require("../utils/validators/feedbackValidator.js");

const router = express.Router();

router.route("/").get(getFeedbacks).post(createFeedbackValidator, createFeedback);

router
  .route("/:id")
  .get(getFeedbackValidator, getFeedback)
  .put(updateFeedbackValidator, updateFeedback)
  .delete(deleteFeedbackValidator, deletFeedback);

module.exports = router;
