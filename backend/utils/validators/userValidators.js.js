const { check } = require("express-validator");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.createUserValidator = [
  check("fName")
    .notEmpty()
    .withMessage("first User name must be specified")
    .isLength({ min: 3 })
    .withMessage("first User name is too short")
    .isLength({ max: 15 })
    .withMessage("first User name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value + " " + req.body.lName, { lower: true });
      return true;
    }),
  check("lName")
    .notEmpty()
    .withMessage("last User name must be specified")
    .isLength({ min: 3 })
    .withMessage("User name is too short")
    .isLength({ max: 15 })
    .withMessage("User name is too long"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      })
    ),
  check("ssn")
    .notEmpty()
    .withMessage("ssn is required")
    .isLength({ min: 14, max: 14 })
    .withMessage("ssn must be 14 characters")
    .custom((value) =>
      User.findOne({ ssn: value }).then((user) => {
        if (user) {
          return Promise.reject("ssn already in use");
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
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.passwordComfirm) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
  check("gov").optional().notEmpty().withMessage("gov must have a value"),
  check("district")
    .optional()
    .notEmpty()
    .withMessage("district must have a value"),
  check("city").optional().notEmpty().withMessage("city must have a value"),
  check("gender")
    .notEmpty()
    .withMessage("gender must be specified")
    .isIn(["male", "female"])
    .withMessage("invalid gender"),
  check("passwordComfirm")
    .notEmpty()
    .withMessage("confirm password is required"),
  check("profileImg").optional(),
  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accept EG and SA phone numbers"),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  validatorMiddleware,
];

exports.updateUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("current password is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .custom(async (value, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("Incorrect id");
      }
      const iscorrect = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!iscorrect) {
        throw new Error("Incorrect current password");
      }
      if (value !== req.body.passwordComfirm) {
        throw new Error("Password and confirm password don't match");
      }
      return true;
    }),
  check("passwordComfirm")
    .notEmpty()
    .withMessage("confirm password is required"),
  validatorMiddleware,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  check("fName")
    .optional()
    .notEmpty()
    .withMessage("first User name must be specified")
    .isLength({ min: 3 })
    .withMessage("first User name is too short")
    .isLength({ max: 15 })
    .withMessage("first User name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value + " " + req.body.lName, { lower: true });
      return true;
    }),
  check("lName")
    .optional()
    .notEmpty()
    .withMessage("last User name must be specified")
    .isLength({ min: 3 })
    .withMessage("last User name is too short")
    .isLength({ max: 15 })
    .withMessage("last User name is too long"),
  check("email")
    .optional()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid")
    .custom((value) =>
      User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      })
    ),
  check("dateOfBirth")
    .optional()
    .notEmpty()
    .withMessage("date of birth is required")
    .isDate()
    .withMessage("date of birth is invalid"),
  check("gov").optional().notEmpty().withMessage("gov must have a value"),
  check("district")
    .optional()
    .notEmpty()
    .withMessage("district must have a value"),
  check("city").optional().notEmpty().withMessage("citymust have a value"),
  check("profileImg").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accept EG and SA phone numbers"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User ID format"),
  validatorMiddleware,
];
