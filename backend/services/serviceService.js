const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Service = require("../models/serviceModel");

// @desc    Get list of services
// @route   GET /api/v1/services
// @access  public
exports.getServices = factory.getAll(Service);

// @desc    Get specific service by id
// @route   GET /api/v1/services/:id
// @access  public
exports.getService = factory.getOne(Service);

// @desc    Create service
// @route   POST  /api/v1/services
// @access  Private/Admin
exports.createService = factory.createOne(Service);

// @desc    Update specific service
// @route   PUT /api/v1/services/:id
// @access  Private/Admin
exports.updateService = factory.updateOne(Service);

// @desc    Delete specific service
// @route   DELETE /api/v1/service/:id
// @access  Private/Admin
exports.deletService = factory.deleteOne(Service);
