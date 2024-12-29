const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Slot = require("../models/slotModel");

// @desc    Get list of slot
// @route   GET /api/v1/slots
// @access  public
exports.getSlots = factory.getAll(Slot);

// @desc    Get specific slot by id
// @route   GET /api/v1/slots/:id
// @access  public
exports.getSlot = factory.getOne(Slot);

// @desc    Create slot
// @route   POST  /api/v1/slots
// @access  Private/Admin
exports.createSlot = factory.createOne(Slot);

// @desc    Update specific slot
// @route   PUT /api/v1/slots/:id
// @access  Private/Admin
exports.updateSlot = factory.updateOne(Slot);

// @desc    Delete specific slot
// @route   DELETE /api/v1/slot/:id
// @access  Private/Admin
exports.deleteSlot = factory.deleteOne(Slot);
