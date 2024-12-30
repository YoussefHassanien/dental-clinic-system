const Appointment = require("../models/appointmentModel");
const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Wallet = require("../models/walletModel");
const Patient = require("../models/patientModel");
const Service = require("../models/serviceModel");
const User = require("../models/userModel");

exports.getAllTodayAppointments = asyncHandler(async (req, res, next) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  console.log(todayString);

  const appointments = await Appointment.find({
    date: todayString,
  });
  const todayAppointments = await Promise.all(
    appointments.map(async (appointment) => {
      const doctor = await User.findById(appointment.doctorId);
      const patient = await User.findById(appointment.patientId);
      console.log(doctor);
      console.log(appointment.patientId);
      return {
        doctor: {
          firstname: doctor.fName,
          lastname: doctor.lName,
          email: doctor.email,
        },
        patient: {
          firstname: patient.fName,
          lastname: patient.lName,
          email: patient.email,
        },
        date: appointment.date,
        startTime: appointment.startTime,
      };
    })
  );
  res.status(200).json({
    status: "success",
    data: todayAppointments,
  });
});
