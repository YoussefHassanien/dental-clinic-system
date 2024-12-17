const express = require("express");
const {
  getAllAppointments,
  getAppointment,
  updateAppointment,
  createAppointment,
  deleteAppointment,
} = require("../services/appointmentServices");
const {
  createAppointmentValidator,
  getAppointmentValidator,
  updateAppointmentValidator,
  deleteAppointmentValidator,
} = require("../utils/validators/appointmentValidator");

const router = express.Router();

router
  .route("/")
  .get(getAllAppointments)
  .post(createAppointmentValidator, createAppointment);

router
  .route("/:id")
  .get(getAppointmentValidator, getAppointment)
  .put(updateAppointmentValidator, updateAppointment)
  .delete(deleteAppointmentValidator, deleteAppointment);

module.exports = router;
