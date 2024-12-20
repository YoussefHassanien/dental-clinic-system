const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Request = require("../models/requestModel");

// @desc    add request
// @route   POST /api/v1/request
// @access  private doctor/admin
exports.addRequest = factory.createOne(Request);

// @desc    get list all requests
// @route   POST /api/v1/request
// @access  private doctor/admin
exports.getRequests = factory.getAll(Request);

// @desc    delete request
// @route   POST /api/v1/request/:id
// @access  private doctor/admin
exports.deleteRequest = factory.deleteOne(Request);
