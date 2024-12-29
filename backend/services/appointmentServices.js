const Appointment = require("../models/appointmentModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");
const Slot = require("../models/slotModel");

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
  const { doctorId, date, notes, startTime, endTime } = req.body;
  const appointment = await Appointment.create({
    patientId,
    doctorId,
    date,
    startTime,
    endTime,
  });
  res.status(201).json({
    status: "success",
    data: {
      appointment,
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
