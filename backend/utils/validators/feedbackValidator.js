const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const feedback = require("../../models/feedbackModel");

exports.createFeedbackValidator = [
  check("rating")
    .notEmpty()
    .withMessage("rating is required")
    .isIn([1, 2, 3, 4, 5])
    .withMessage("rating is between  1 to 5"),
  check("notes")
    .notEmpty()
    .withMessage("notes are required")
    .isLength({ max: 100 })
    .withMessage("notes are too long"),
  validatorMiddleware,
];

exports.getFeedbackValidator = [
  check("id").isMongoId().withMessage("Invalid feedback ID format"),
  validatorMiddleware,
];

exports.updateFeedbackValidator = [
  check("rating")
    .optional()
    .notEmpty()
    .withMessage("rating must be specified")
    .isIn([1, 2, 3, 4, 5])
    .withMessage("rating is betwwen  1 to 5"),
  check("notes")
    .optional()
    .notEmpty()
    .withMessage("notes are required")
    .isLength({ max: 100 })
    .withMessage("notes are too long"),
  validatorMiddleware,
];

exports.deleteFeedbackValidator = [
  check("id").isMongoId().withMessage("Invalid feedback ID format"),
  validatorMiddleware,
];
