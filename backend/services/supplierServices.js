const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Supplier = require("../models/supplierModel");

// @desc    Get list of Suppliers
// @route   GET /api/v1/Suppliers
// @access  Private/Admin
exports.getSuppliers = factory.getAll(Supplier);

// @desc    Get specific Supplier by id
// @route   GET /api/v1/Suppliers/:id
// @access  Private/Admin
exports.getSupplier = factory.getOne(Supplier);

// @desc    Create Supplier
// @route   POST  /api/v1/Suppliers
// @access  Private/Admin
exports.createSupplier = factory.createOne(Supplier);

// @desc    Update specific Supplier
// @route   PUT /api/v1/Suppliers/:id
// @access  Private/Admin
exports.updateSupplier = factory.updateOne(Supplier);

// @desc    Delete specific Supplier
// @route   DELETE /api/v1/Supplier/:id
// @access  Private/Admin
exports.deletSupplier = factory.deleteOne(Supplier);
