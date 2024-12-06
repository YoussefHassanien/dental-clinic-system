const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const Wallet = require("../../models/walletModel");

exports.signupValidator = [
  check("fName")
    .notEmpty()
    .withMessage("First name must be specified")
    .isLength({ min: 3 })
    .withMessage("First name is too short")
    .isLength({ max: 15 })
    .withMessage("First name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value + " " + req.body.lName, { lower: true });
      return true;
    }),

  check("lName")
    .notEmpty()
    .withMessage("Last name must be specified")
    .isLength({ min: 3 })
    .withMessage("Last name is too short")
    .isLength({ max: 15 })
    .withMessage("Last name is too long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      })
    ),
  check("ssn")
    .notEmpty()
    .withMessage("SSN is required")
    .isLength({ min: 14, max: 14 })
    .withMessage("SSN must be exactly 14 digits")
    .matches(/^\d+$/)
    .withMessage("SSN must be numeric")
    .custom((value) =>
      User.findOne({ ssn: value }).then((user) => {
        if (user) {
          return Promise.reject("SSN already exists");
        }
      })
    ),
  check("dateOfBirth")
    .notEmpty()
    .withMessage("date of birth is required")
    .isDate()
    .withMessage("date of birth is invalid"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.passwordComfirm) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),

  check("passwordComfirm")
    .notEmpty()
    .withMessage("Confirm password is required"),

  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number, only accept EG and SA phone numbers"),
  check("gov").optional().notEmpty().withMessage("gov must have a value"),
  check("district")
    .optional()
    .notEmpty()
    .withMessage("district must have a value"),
  check("city").optional().notEmpty().withMessage("city must have a value"),
  check("gender")
    .notEmpty()
    .withMessage("gender must be specified")
    .isBoolean()
    .withMessage("Invalid gender "),

  check("profileImg").optional(),

  check("bloodType")
    .notEmpty()
    .withMessage("Blood type is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type"),

  check("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array of strings"),

  check("cardNumber")
    .optional()
    .isLength({ min: 16, max: 16 })
    .withMessage("Card number must be exactly 16 digits")
    .matches(/^\d+$/)
    .withMessage("Card number must be numeric")
    .custom((value) =>
      Wallet.findOne({ cardNumber: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      })
    ),

  check("cvv")
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage("CVV must be exactly 3 digits")
    .matches(/^\d+$/)
    .withMessage("CVV must be numeric"),

  check("credit")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Credit must be a positive number"),

  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  validatorMiddleware,
];
