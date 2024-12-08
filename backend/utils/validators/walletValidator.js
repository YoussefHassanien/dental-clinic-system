const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Wallet = require("../../models/walletModel");

exports.createWalletValidator = [
  check("cardNumber")
    .notEmpty()
    .withMessage("Card number is required")
    .isLength({ min: 16, max: 16 })
    .withMessage("Card number must be exactly 16 digits")
    .matches(/^\d{16}$/)
    .withMessage("Card number must only contain digits")
    .custom((value) =>
      Wallet.findOne({ cardNumber: value }).then((wallet) => {
        if (wallet) {
          return Promise.reject("This card number is already in use");
        }
      })
    ),
  check("cvv")
    .notEmpty()
    .withMessage("CVV is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("CVV must be exactly 3 digits")
    .matches(/^\d{3}$/)
    .withMessage("CVV must only contain digits"),
  check("credit")
    .notEmpty()
    .withMessage("Credit amount is required")
    .isNumeric()
    .withMessage("Credit must be a numeric value")
    .isFloat({ min: 0 })
    .withMessage("Credit amount must be greater than or equal to 0"),
  validatorMiddleware,
];

exports.getWalletValidator = [
  check("id").isMongoId().withMessage("Invalid Wallet ID format"),
  validatorMiddleware,
];

exports.updateWalletValidator = [
  check("cardNumber")
    .optional()
    .notEmpty()
    .withMessage("Card number is required")
    .isLength({ min: 16, max: 16 })
    .withMessage("Card number must be exactly 16 digits")
    .matches(/^\d{16}$/)
    .withMessage("Card number must only contain digits")
    .custom((value) =>
      Wallet.findOne({ cardNumber: value }).then((wallet) => {
        if (wallet) {
          return Promise.reject("This card number is already in use");
        }
      })
    ),
  check("cvv")
    .optional()
    .notEmpty()
    .withMessage("CVV is required")
    .isLength({ min: 3, max: 3 })
    .withMessage("CVV must be exactly 3 digits")
    .matches(/^\d{3}$/)
    .withMessage("CVV must only contain digits"),
  check("credit")
    .optional()
    .notEmpty()
    .withMessage("Credit amount is required")
    .isNumeric()
    .withMessage("Credit must be a numeric value")
    .isFloat({ min: 0 })
    .withMessage("Credit amount must be greater than or equal to 0"),
  validatorMiddleware,
];

exports.deleteWalletValidator = [
  check("id").isMongoId().withMessage("Invalid Wallet ID format"),
  validatorMiddleware,
];
