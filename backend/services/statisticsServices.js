const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const Feedback = require("../models/feedbackModel");
const Patient = require("../models/patientModel");

//@desc     user statistics
//@route    POST /api/v1/statistics/pate
//@access   Private(admin)
exports.userStatistics = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  const usersCount = users.length;
  const patientsCount = users.filter((user) => user.role === "patient").length;
  const doctorsCount = users.filter((user) => user.role === "doctor").length;
  const adminsCount = users.filter((user) => user.role === "admin").length;
  const staffCount = users.filter((user) => user.role === "staff").length;
  res.status(200).json({
    status: "success",
    data: {
      usersCount,
      patientsCount,
      doctorsCount,
      adminsCount,
      staffCount,
    },
  });
});

//@desc     appointments statistics
//@route    POST /api/v1/statistics/pate
//@access   Private(admin)
exports.appointmentStatistics = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find();
  const appointmentsCount = appointments.length;
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  ).length;
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  ).length;
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "cancelled"
  ).length;
  res.status(200).json({
    status: "success",
    data: {
      appointmentsCount,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
    },
  });
});

//@desc     feedback statistics
//@route    POST /api/v1/statistics/pate
//@access   Private(admin)
exports.feedBackStatistics = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();
  const feedbacksCount = feedbacks.length;
  const positiveFeedbacks = feedbacks.filter(
    (feedback) => feedback.rating >= 4
  ).length;
  const negativeFeedbacks = feedbacks.filter(
    (feedback) => feedback.rating < 4
  ).length;
  res.status(200).json({
    status: "success",
    data: {
      feedbacksCount,
      positiveFeedbacks,
      negativeFeedbacks,
    },
  });
});

//@desc     patient statistics
//@route    POST /api/v1/statistics/patients
//@access   Private(admin)
exports.patientStatistics = asyncHandler(async (req, res, next) => {
  const patients = await Patient.find();
  const patientsCount = patients.length;
  const firstTimePatients = patients.filter(
    (patient) => patient.totalVisits <= 1
  ).length;
  const oldPatients = patientsCount - firstTimePatients;

  res.status(200).json({
    status: "success",
    data: {
      patientsCount,
      firstTimePatients,
      oldPatients,
    },
  });
});
