const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Patient = require("../models/patientModel");

// @desc    Get list of patients
// @route   GET /api/v1/patients
// @access  public
exports.getPatients = factory.getAll(Patient);

// @desc    Get specific patient by id
// @route   GET /api/v1/patients/:id
// @access  public
exports.getPatient = factory.getOne(Patient);

// @desc    Create patient
// @route   POST  /api/v1/patients
// @access  Private/Admin
exports.createPatient = factory.createOne(Patient);

// @desc    Update specific patient
// @route   PUT /api/v1/patients/:id
// @access  Private/Admin
exports.updatePatient = factory.updateOne(Patient);

// @desc    Delete specific patient
// @route   DELETE /api/v1/patient/:id
// @access  Private/Admin
exports.deletPatient = factory.deleteOne(Patient);
