const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Feedback = require("../models/feedbackModel");

// @desc    Get list of Feedbacks
// @route   GET /api/v1/Feedbacks
// @access  public
exports.getFeedbacks = factory.getAll(Feedback);

// @desc    Get specific Feedback by id
// @route   GET /api/v1/Feedbacks/:id
// @access  public
exports.getFeedback = factory.getOne(Feedback);

// @desc    Create Feedback
// @route   POST  /api/v1/Feedbacks
// @access  Private/Admin
exports.createFeedback = factory.createOne(Feedback);

// @desc    Update specific Feedback
// @route   PUT /api/v1/Feedbacks/:id
// @access  Private/Admin
exports.updateFeedback = factory.updateOne(Feedback);

// @desc    Delete specific Feedback
// @route   DELETE /api/v1/Feedback/:id
// @access  Private/Admin
exports.deletFeedback = factory.deleteOne(Feedback);
