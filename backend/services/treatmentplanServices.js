const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Treatmentplan = require("../models/treatmentplanModel");

// @desc    Get list of Treatmentplans
// @route   GET /api/v1/treatmentplans
// @access  public
exports.getTreatmentplans = factory.getAll(Treatmentplan);

// @desc    Get specific Treatmentplan by id
// @route   GET /api/v1/treatmentplans/:id
// @access  public
exports.getTreatmentplan = factory.getOne(Treatmentplan);

// @desc    Create Treatmentplan
// @route   POST  /api/v1/treatmentplans
// @access  Private/Admin
exports.createTreatmentplan = factory.createOne(Treatmentplan);

// @desc    Update specific Treatmentplan
// @route   PUT /api/v1/treatmentplans/:id
// @access  Private/Admin
exports.updateTreatmentplan = factory.updateOne(Treatmentplan);

// @desc    Delete specific Treatmentplan
// @route   DELETE /api/v1/treatmentplan/:id
// @access  Private/Admin
exports.deleteTreatmentplan = factory.deleteOne(Treatmentplan);
