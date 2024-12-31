const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Appointment = require("../../models/appointmentModel");
const Patient = require("../../models/patientModel");
exports.payValidator = [
  check("appointmentId")
    .notEmpty()
    .withMessage("appointment id is required")
    .isMongoId()
    .withMessage("Invalid appointment id")
    .custom(async (value) => {
      const appointment = await Appointment.findById(value);
      if (!appointment) {
        return Promise.reject("appointment not found");
      }
      if (appointment.paid) {
        return Promise.reject("appointment already paid");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.appointmentValidator = [
  check("doctorId")
    .notEmpty()
    .withMessage("doctor id is required")
    .isMongoId()
    .withMessage("Invalid doctor id"),
  check("startTime")
    .notEmpty()
    .withMessage("Start hour is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start hour must be in HH:mm format (24-hour)"),
  check("patientEmail")
    .notEmpty()
    .withMessage("Patient email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      const patient = await Patient.findOne({ email: value });
      if (!patient) {
        return Promise.reject("Patient not found");
      }
      return true;
    }),

  validatorMiddleware,
];
