const express = require("express");
const {
  getAllTodayAppointments,
  nearestReservationtOfEveryDoctor,
  payAppointment,
  bookAppointmentForVisitor,
} = require("../services/receptionistServices");
const {
  payValidator,
  appointmentValidator,
} = require("../utils/validators/receptionistValidator");

const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();

router
  .route("/today")
  .get(auth, allowedTo("receptionist"), getAllTodayAppointments);
router
  .route("/nearest")
  .get(auth, allowedTo("receptionist"), nearestReservationtOfEveryDoctor);
router
  .route("/pay")
  .post(auth, allowedTo("receptionist"), payValidator, payAppointment);

router
  .route("/book")
  .post(
    auth,
    allowedTo("receptionist"),
    appointmentValidator,
    bookAppointmentForVisitor
  );

module.exports = router;
