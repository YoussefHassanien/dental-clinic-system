const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Contactus = require("../models/contactusModel");

// @desc    Get list of Contactus
// @route   GET /api/v1/Contactus
// @access  Private/Admin
exports.getContactuss = factory.getAll(Contactus);

// @desc    Get specific Contactus by id
// @route   GET /api/v1/Contactus/:id
// @access  Private/Admin
exports.getContactus = factory.getOne(Contactus);

// @desc    Create Contactus
// @route   POST  /api/v1/Contactus
// @access  Private/Admin
exports.createContactus = factory.createOne(Contactus);

// @desc    Update specific Contactus
// @route   PUT /api/v1/Contactus/:id
// @access  Private/Admin
exports.updateContactus = factory.updateOne(Contactus);

// @desc    Delete specific Contactus
// @route   DELETE /api/v1/Contactus/:id
// @access  Private/Admin
exports.deleteContactus = factory.deleteOne(Contactus);