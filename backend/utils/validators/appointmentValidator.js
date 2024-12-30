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
  check("startTime")
    .notEmpty()
    .withMessage("Start hour is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Start hour must be in HH:mm format (24-hour)"),
  check("endTime")
    .notEmpty()
    .withMessage("End hour is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("End hour must be in HH:mm format (24-hour)")
    .custom((value, { req }) => {
      const [startHour, startMinute] = req.body.startTime
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
    .custom(async (value, { req }) => {
      const appointmentDate = new Date(value);

      if (appointmentDate < new Date()) {
        throw new Error("The appointment date has already passed");
      }

      const dayIndex = appointmentDate.getDay();
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = dayNames[dayIndex];

      const doctor = await Doctor.findOne({ userId: req.body.doctorId });

      if (!doctor) {
        throw new Error("Doctor not found");
      }

      const dayAvailability = doctor.thisWeekAvailability.find(
        (availability) => availability.day === dayName
      );

      if (!dayAvailability) {
        throw new Error(`No availability defined for ${dayName}`);
      }

      if (!dayAvailability.slots || dayAvailability.slots.length === 0) {
        throw new Error(`No slots available on ${dayName}`);
      }
      const requestedStartTime = req.body.startTime;
      const slotAvailable = dayAvailability.slots.some(
        (slot) => slot.startTime === requestedStartTime
      );

      if (!slotAvailable) {
        throw new Error(
          `The requested slot at ${requestedStartTime} is unavailable`
        );
      }

      return true;
    }),

  check("notes").optional().notEmpty().withMessage("you provided empty notes"),

  validatorMiddleware,
];

exports.doctorResponseValidator = [
  check("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["approved", "rejected"])
    .withMessage("Invalid status"),
  check("appointmentId")
    .notEmpty()
    .withMessage("Appointment ID is required")
    .isMongoId()
    .withMessage("Invalid appointment ID")
    .custom(async (value) => {
      const appointment = await Appointment.findById(value);
      if (!appointment) {
        return Promise.reject("Appointment not found");
      }
      if (appointment.status !== "pending") {
        return Promise.reject("Appointment is already responded to");
      }
      if (appointment.doctorId.toString() !== req.user.id) {
        return Promise.reject("You are not the doctor of this appointment");
      }
      return true;
    }),
  validatorMiddleware,
];
