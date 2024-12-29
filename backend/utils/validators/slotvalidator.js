const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Doctor = require("../../models/doctorModel");
const User = require("../../models/userModel");
const Slot = require("../../models/slotModel");
const slugify = require("slugify");

exports.bookSlotValidator = [
  check("date")
    .notEmpty()
    .withMessage("Date is required")
    .isDate()
    .withMessage("Date is invalid")
    .custom((value) => {
      if (value < Date.now()) {
        return Promise.reject("Date must be in the future");
      }
    }),
  check("startTime").notEmpty().withMessage("Start time is required"),
  check("endTime").notEmpty().withMessage("Start time is required"),
  check("status")
    .optional()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["booked", "cancelled", "onhold"]),
  check("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isMongoId()
    .withMessage("Doctor ID is invalid")
    .custom(async (value, { req }) => {
      req.body.doctorId = value || req.user.id;
      if (req.user.role === "doctor") {
        req.body.status = "booked";
      }
      const doctor = await Doctor.find({ userId: req.body.doctorId });
      if (!doctor) {
        return Promise.reject("Doctor not found");
      }
      if (
        doctor.thisWeekAvailability[0] < req.body.startTime ||
        doctor.thisWeekAvailability[1] > req.body.endTime
      ) {
        return Promise.reject("Doctor is not availble at this time");
      }
    })
    .custom(async (value, { req }) => {
      const slots = await Slot.find({ doctorId: value });
      slots.forEach((slot) => {
        if (slot.date === req.body.date) {
          if (
            (slot.startTime <= req.body.startTime &&
              slot.startTime >= req.body.endTime) ||
            (slot.endTime <= req.body.startTime &&
              slot.endTime >= req.body.endTime)
          ) {
            return Promise.reject("doctor is busy with another appointment");
          }
        }
      });
    }),

  validatorMiddleware,
];
