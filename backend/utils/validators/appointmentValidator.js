const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Patient = require("../../models/patientModel");
const Doctor = require("../../models/doctorModel");
const Appointment = require("../../models/appointmentModel");

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

exports.bookAppointmentValidator = [
  check("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Doctor ID is invalid")
    .custom(async (value, { req }) => {
      req.body.doctorId = value || req.user.id;
      const doctor = await Doctor.findOne({ userId: req.body.doctorId });
      if (!doctor) {
        return Promise.reject("Doctor not found");
      }
      if (
        doctor.thisWeekAvailability[0] > req.body.startTime ||
        doctor.thisWeekAvailability[1] < req.body.endTime
      ) {
        return Promise.reject("Doctor is not availble at this time");
      }
    })
    .custom(async (value, { req }) => {
      const appointments = await Appointment.find({
        doctorId: value,
        date: req.body.date,
      });

      for (const appointment of appointments) {
        const requestedStartTime = req.body.startTime;
        const requestedEndTime = req.body.endTime;
        const appointmentStartTime = appointment.startTime;
        const appointmentEndTime = appointment.endTime;
        if (
          (requestedStartTime >= appointmentStartTime &&
            requestedStartTime < appointmentEndTime) ||
          (requestedEndTime > appointmentStartTime &&
            requestedEndTime <= appointmentEndTime) ||
          (requestedStartTime <= appointmentStartTime &&
            requestedEndTime >= appointmentEndTime)
        ) {
          throw new Error("Doctor is busy with another appointment");
        }
      }
    }),
  check("startTime").notEmpty().withMessage("Start time is required"),
  check("endTime").notEmpty().withMessage("Start time is required"),
  check("status")
    .optional()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "approved", "rejected", "completed"]),
  check("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Invalid date")
    .custom((value) => {
      const appointmentDate = new Date(value);
      if (appointmentDate < Date.now()) {
        throw new Error("The appointment date has already passed");
      }
      return true;
    }),
  check("notes").optional().notEmpty().withMessage("you provided empty notes"),

  validatorMiddleware,
];
