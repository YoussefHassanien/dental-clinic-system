const express = require("express");
const {
  getWallet,
  getWallets,
  createWallet,
  updateWallet,
  deletWallet,
} = require("../services/walletService.js");

const {
  getWalletValidator,
  createWalletValidator,
  updateWalletValidator,
  deleteWalletValidator,
} = require("../utils/validators/walletValidator.js");

const router = express.Router();

router.route("/").get(getWallets).post(createWalletValidator, createWallet);

router
  .route("/:id")
  .get(getWalletValidator, getWallet)
  .put(updateWalletValidator, updateWallet)
  .delete(deleteWalletValidator, deletWallet);

module.exports = router;
