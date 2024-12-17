const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Patient = require("../../models/patientModel");
const Doctor = require("../../models/doctorModel");

exports.createAppointmentValidator = [
  check("patientId")
    .notEmpty()
    .withMessage("Patient id is required")
    .isMongoId()
    .withMessage("Invalid patient id")
    .custom(async (value) => {
      const patient = await Patient.findById(value);
      if (!patient) {
        return Promise.reject("Patient not found");
      }
    })
    .withMessage("patient not found"),
  check("doctorId")
    .notEmpty()
    .withMessage("Doctor id is required")
    .isMongoId()
    .withMessage("Invalid doctor id")
    .custom(async (value) => {
      const doctor = await Doctor.findById(value);
      if (!doctor) {
        return Promise.reject("Patient not found");
      }
    }),
  check("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Invalid date")
    .custom((value) => {
      const appointmentDate = new Date(value);
      const currentDate = new Date();
      if (appointmentDate < currentDate) {
        throw new Error("The appointment date has already passed");
      }
      return true;
    }),
  check("notes").optional().notEmpty().withMessage("you provided empty notes"),
  check("status")
    .optional()
    .notEmpty()
    .withMessage("you provided empty status"),
  validatorMiddleware,
];

exports.updateAppointmentValidator = [
  check("id")
    .notEmpty()
    .withMessage("Appointment id is required")
    .isMongoId()
    .withMessage("Invalid appointment id"),
  validatorMiddleware,
];
exports.getAppointmentValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("Invalid id"),
  validatorMiddleware,
];
exports.deleteAppointmentValidator = [
  check("id")
    .notEmpty()
    .withMessage("id is required")
    .isMongoId()
    .withMessage("Invalid id"),
  validatorMiddleware,
];
