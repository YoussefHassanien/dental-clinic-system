const Appointment = require("../models/appointmentModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");

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

//@desc     update appointment
//@route    POST /api/v1/appointments/:id
//@access   Private
exports.updateAppointment = factory.updateOne(Appointment);

//@desc     delete appointment
//@route    POST /api/v1/appointments/:id
//@access   Private
exports.deleteAppointment = factory.deleteOne(Appointment);
