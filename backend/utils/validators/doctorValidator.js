const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Doctor = require("../../models/doctorModel");
const User = require("../../models/userModel");
const slugify = require("slugify");

exports.addDoctorValidator = [
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
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  validatorMiddleware,
];
exports.createDoctorValidator = [
  check("userId")
    .notEmpty()
    .withMessage("User ID must be specified")
    .isMongoId()
    .withMessage("Invalid User ID format")
    .custom((value) =>
      Doctor.findOne({ userId: value }).then((doctor) => {
        if (doctor) {
          return Promise.reject("A doctor with this user ID already exists");
        }
      })
    )
    .custom((value) =>
      User.findOne({ _id: value }).then((user) => {
        if (!user) {
          return Promise.reject("No user with this ID exists");
        }
      })
    ),
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  validatorMiddleware,
];
exports.addRatingValidator = [
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  validatorMiddleware,
];
exports.getDoctorValidator = [
  check("id")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID format"),
  validatorMiddleware,
];

exports.updateDoctorValidator = [
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),
  validatorMiddleware,
];

exports.deleteDoctorValidator = [
  check("id")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Invalid Doctor ID format"),
  validatorMiddleware,
];
