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
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject("email already exists");
      }
    }),
  check("ssn")
    .notEmpty()
    .withMessage("SSN is required")
    .isLength({ min: 14, max: 14 })
    .withMessage("SSN must be exactly 14 digits")
    .matches(/^\d+$/)
    .withMessage("SSN must be numeric")
    .custom(async (value) => {
      const user = await User.findOne({ ssn: value });
      if (user) {
        return Promise.reject("SSN already exists");
      }
    }),
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
    .isIn(["male", "female"])
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
  check("languages")
    .optional()
    .isArray()
    .withMessage("Languages must be an array"),
  check("specialities")
    .notEmpty()
    .withMessage("Specialities are required")
    .isArray()
    .withMessage("Specialities must be an array"),
  check("experience")
    .notEmpty()
    .withMessage()
    .isNumeric()
    .withMessage("Experience must be a number"),
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
  check("languages")
    .optional()
    .isArray()
    .withMessage("Languages must be an array"),
  check("specialities")
    .notEmpty()
    .withMessage("Specialities are required")
    .isArray()
    .withMessage("Specialities must be an array"),
  check("experience")
    .notEmpty()
    .withMessage()
    .isNumeric()
    .withMessage("Experience must be a number"),

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
  check("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  check("languages")
    .optional()
    .isArray()
    .withMessage("Languages must be an array"),
  check("specialities")
    .optional()
    .notEmpty()
    .withMessage("Specialities are required")
    .isArray()
    .withMessage("Specialities must be an array"),
  check("experience")
    .optional()
    .notEmpty()
    .withMessage()
    .isNumeric()
    .withMessage("Experience must be a number"),
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

exports.addNextWeekSlotsValidator = [
  check("startHour")
    .notEmpty()
    .withMessage("Start hour is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start hour must be in HH:mm format (24-hour)"),
  check("endHour")
    .notEmpty()
    .withMessage("End hour is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("End hour must be in HH:mm format (24-hour)")
    .custom((value, { req }) => {
      const [startHour, startMinute] = req.body.startHour
        .split(":")
        .map(Number);
      const [endHour, endMinute] = value.split(":").map(Number);
      if (
        endHour < startHour ||
        (endHour === startHour && endMinute <= startMinute)
      ) {
        throw new Error("End hour must be greater than start hour");
      }
      return true;
    })
    .custom((value, { req }) => {
      const doctor = Doctor.findOne({ userId: req.user.id });
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      return true;
    }),
  validatorMiddleware,
];
