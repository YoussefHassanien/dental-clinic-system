const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const Wallet = require("../../models/walletModel");

exports.createPatientValidator = [
  check("bloodType")
    .notEmpty()
    .withMessage("Blood type is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),

  check("allergies")
    .isArray()
    .withMessage("Allergies must be an array of strings"),
  check("userId")
    .notEmpty()
    .withMessage("User id is required")
    .isMongoId()
    .withMessage("Invalid user id")
    .custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        return Promise.reject("User not found");
      }
    }),
  check("wallet")
    .optional()
    .notEmpty()
    .withMessage("Wallet reference is required")
    .isMongoId()
    .withMessage("Invalid wallet reference")
    .custom(async (value) => {
      const wallet = await Wallet.findById(value);
      if (!wallet) {
        return Promise.reject("Wallet not found");
      }
    }),
  validatorMiddleware,
];

exports.updatePatientValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid id"),
  check("bloodType")
    .optional()
    .notEmpty()
    .withMessage("Blood type is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),

  check("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array of strings"),
  check("wallet")
    .optional()
    .notEmpty()
    .withMessage("Wallet reference is required")
    .isMongoId()
    .withMessage("Invalid wallet reference")
    .custom(async (value) => {
      const wallet = await Wallet.findById(value);
      if (!wallet) {
        return Promise.reject("Wallet not found");
      }
    }),
  validatorMiddleware,
];

exports.getPatientValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid id"),
  validatorMiddleware,
];

exports.deletePatientValidator = [
  check("id")
    .notEmpty()
    .withMessage("id required")
    .isMongoId()
    .withMessage("Invalid id"),
  validatorMiddleware,
];
