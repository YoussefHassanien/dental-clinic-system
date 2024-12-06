const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Wallet = require("../models/walletModel");

// @desc    Get list of wallets
// @route   GET /api/v1/wallets
// @access  public
exports.getWallets = factory.getAll(Wallet);

// @desc    Get specific wallet by id
// @route   GET /api/v1/wallets/:id
// @access  public
exports.getWallet = factory.getOne(Wallet);

// @desc    Create wallet
// @route   POST  /api/v1/wallets
// @access  Private/Admin
exports.createWallet = factory.createOne(Wallet);

// @desc    Update specific wallet
// @route   PUT /api/v1/wallets/:id
// @access  Private/Admin
exports.updateWallet = factory.updateOne(Wallet);

// @desc    Delete specific wallet
// @route   DELETE /api/v1/wallet/:id
// @access  Private/Admin
exports.deletWallet = factory.deleteOne(Wallet);
