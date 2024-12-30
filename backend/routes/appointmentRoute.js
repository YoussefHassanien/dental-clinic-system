const express = require("express");
const {
  getAllAppointments,
  getAppointment,
  updateAppointment,
  createAppointment,
  deleteAppointment,
  bookAppointment,
  doctorResponse,
  getloggedPatientAppointments,
} = require("../services/appointmentServices");
const {
  createAppointmentValidator,
  getAppointmentValidator,
  updateAppointmentValidator,
  deleteAppointmentValidator,
  bookAppointmentValidator,
  doctorResponseValidator,
} = require("../utils/validators/appointmentValidator");
const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();

router
  .route("/")
  .get(getAllAppointments)
  .post(createAppointmentValidator, createAppointment);
router
  .route("/book")
  .post(auth, allowedTo("patient"), bookAppointmentValidator, bookAppointment);
router
  .route("/response")
  .put(auth, allowedTo("doctor"), doctorResponseValidator, doctorResponse);
router
  .route("/patient")
  .get(auth, allowedTo("patient"), getloggedPatientAppointments);
router
  .route("/:id")
  .get(getAppointmentValidator, getAppointment)
  .put(updateAppointmentValidator, updateAppointment)
  .delete(deleteAppointmentValidator, deleteAppointment);

module.exports = router;
