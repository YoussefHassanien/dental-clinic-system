const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Service = require("../../models/serviceModel");
const Doctor = require("../../models/doctorModel");
const Appointment = require("../../models/appointmentModel");

exports.createServiceValidator = [
  check("name")
    .notEmpty()
    .withMessage("service name must be specified")
    .isLength({ min: 3 })
    .withMessage("service name is too short")
    .isLength({ max: 50 })
    .withMessage("service name is too long")
    .custom((value, { req }) => {
      req.body.doctorId = req.body.doctorId || req.user._id;
      req.body.slug = slugify(value);
      return true;
    })
    .custom((value) =>
      Service.findOne({ name: value }).then((service) => {
        if (service) {
          return Promise.reject("this service already exists");
        }
      })
    ),
  check("price")
    .notEmpty()
    .withMessage("price must be specified")
    .isLength({ max: 15 })
    .withMessage("price is too long"),
  check("dates")
    .optional()
    .notEmpty()
    .withMessage("dates must be specified")
    .isArray()
    .withMessage("dates must be an array"),
  check("doctorId").custom(async (value, { req }) => {
    console.log(req.body);
    const doctor = await Doctor.findOne({ userId: req.body.doctorId });
    if (!doctor) {
      return Promise.reject("Doctor not found");
    }
    return true;
  }),
  check("appointmentId")
    .notEmpty()
    .withMessage("appointment id must be specified")
    .isMongoId()
    .withMessage("Invalid appointment ID format")
    .custom(async (value) => {
      const appointment = await Appointment.findById(value);
      if (!appointment) {
        return Promise.reject("Appointment not found");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service ID format"),
  validatorMiddleware,
];

exports.updateServiceValidator = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("service name must be specified")
    .isLength({ min: 3 })
    .withMessage("service name is too short")
    .isLength({ max: 50 })
    .withMessage("service name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
    .custom(async (value) => {
      const service = await Service.findOne({ name: value });
      if (service) {
        return Promise.reject("service already exists");
      }
      return true;
    }),
  check("price")
    .optional()
    .notEmpty()
    .withMessage("price must be specified")
    .isLength({ max: 15 })
    .withMessage("price is too long"),
  check("doctorId").custom(async (value, { req }) => {
    const doctorId = value || req.user.id;
    const doctor = await Doctor.findOne({ userId: doctorId });
    if (!doctor) {
      return Promise.reject("Doctor not found");
    }
    req.body.doctorId = doctorId;
    return true;
  }),
  check("dates")
    .optional()
    .notEmpty()
    .withMessage("dates must be specified")
    .isArray()
    .withMessage("dates must be an array")
    .custom(async (value, { req }) => {
      value.forEach((date) => {
        if (isNaN(Date.parse(date))) {
          return Promise.reject("Invalid date format");
        }
        if (Date.parse(date) < Date.now()) {
          return Promise.reject("Date must be in the future");
        }
      });
    }),
  validatorMiddleware,
];
exports.updatePaidValidator = [
  check("id").isMongoId().withMessage("Invalid service ID format"),
  check("paid")
    .notEmpty()
    .withMessage("paid must be specified")
    .custom((value, { req }) => {
      const service = Service.findById(req.params.id);
      if (service.price - service.paid < value) {
        return Promise.reject("paid must be less than the price");
      }
      if (value < 0) {
        return Promise.reject("paid must be positive");
      }
      req.body.lastPaid = Date.now();
      return true;
    }),
  validatorMiddleware,
];

exports.deleteServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service ID format"),
  validatorMiddleware,
];
