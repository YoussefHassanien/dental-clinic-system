const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const Feedback = require("../models/feedbackModel");

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
