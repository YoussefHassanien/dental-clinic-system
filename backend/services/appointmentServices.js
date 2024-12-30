const Appointment = require("../models/appointmentModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const { removeBookedSlot, addBookedSlot } = require("../utils/slotsCreators");
const Doctor = require("../models/doctorModel");
const Wallet = require("../models/walletModel");
const Patient = require("../models/patientModel");
// const { TbPlaystationSquare } = require("react-icons/tb");
// const { STORAGE_TYPES } = require("natural");

//@desc     get list of  appointments
//@route    POST /api/v1/appointments
//@access   Private
exports.getAllAppointments = factory.getAll(Appointment);

//@desc     get single appointment
//@route    POST /api/v1/appointments/:id
//@access   Private
exports.getAppointment = factory.getOne(Appointment);

//@desc     create new appointment
//@route    POST /api/v1/appointments
//@access   Private
exports.createAppointment = factory.createOne(Appointment);

//@desc     book new appointment
//@route    POST /api/v1/appointments/book
//@access   Private(patient)
exports.bookAppointment = asyncHandler(async (req, res, next) => {
  const patientId = req.body.patientId || req.user.id;
  const { doctorId, date, notes, startTime, endTime, pay } = req.body;
  removeBookedSlot(doctorId, date, startTime);
  const doctor = await Doctor.findOne({ userId: doctorId });
  let payment = "pay when you visit us";
  if (pay) {
    const patient = await Patient.findOne({ userId: patientId });
    if (patient.wallet) {
      const wallet = await Wallet.findById(patient.wallet);
      if (wallet.credit < doctor.appointmentFee) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      wallet.credit -= doctor.appointmentFee;
      wallet.save();
      payment = "paid successfully and new balance: " + wallet.credit;
    }
  }
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    startTime,
    endTime,
    notes,
    paid: pay,
  });

  res.status(201).json({
    status: "success",
    data: {
      payment,
      appointment,
    },
  });
});

exports.getloggedPatientAppointments = asyncHandler(async (req, res, next) => {
  const patientId = req.user.id;
  const appointments = await Appointment.find({ patientId });
  res.status(200).json({
    status: "success",
    data: {
      appointments,
    },
  });
});

exports.doctorResponse = asyncHandler(async (req, res, next) => {
  const doctorId = req.user.id;
  const { status, appointmentId } = req.body;
  const appointment = await Appointment.findById(appointmentId);
  const doctor = await Doctor.findOne({ userId: doctorId });
  if (status === "approved") {
    doctor.currentPatients.push(appointment.patientId);
    doctor.save();
  } else if (status === "rejected") {
    addBookedSlot(
      doctorId,
      appointment.date,
      appointment.startTime,
      appointment.endTime
    );
  }
  appointment.status = status;
  appointment.save();
  res.status(200).json({
    status: "success",
    data: {
      message: "appointment status updated successfully",
    },
  });
});

//@desc     update appointment
//@route    POST /api/v1/appointments/:id
//@access   Private
exports.updateAppointment = factory.updateOne(Appointment);

//@desc     delete appointment
//@route    POST /api/v1/appointments/:id
//@access   Private
exports.deleteAppointment = factory.deleteOne(Appointment);
