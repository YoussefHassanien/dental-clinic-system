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

  const appointments = await Appointment.find({
    date: todayString,
  });
  const todayAppointments = await Promise.all(
    appointments.map(async (appointment) => {
      const doctor = await User.findById(appointment.doctorId);
      const patient = await User.findById(appointment.patientId);
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
          phone: patient.phone,
        },
        service: {
          name: "General Checkup",
          price: doctor.appointmentFee,
        },
        date: appointment.date,
        startTime: appointment.startTime,
        paid: appointment.paid,
      };
    })
  );
  res.status(200).json({
    status: "success",
    data: todayAppointments,
  });
});

exports.payAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.body;
  const appointment = await Appointment.findById(appointmentId);
  const doctor = await Doctor.findOne({ userId: appointment.doctorId });
  appointment.paid = true;
  appointment.status = "completed";
  appointment.save();
  doctor.numberOfSessions += 1;
  doctor.save();
  res.status(200).json({
    status: "success",
  });
});

exports.nearestReservationtOfEveryDoctor = asyncHandler(
  async (req, res, next) => {
    const day = new Date();
    const dayIndex = day.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const doctors = await Doctor.find();
    const today = dayNames[dayIndex];

    const nearestSlots = await Promise.all(
      doctors.map(async (doctor) => {
        doctorData = await User.findById(doctor.userId);
        // Find today's availability for the doctor
        const todayAvailability = doctor.thisWeekAvailability.find(
          (availability) => availability.day === today
        );

        if (!todayAvailability || !todayAvailability.slots.length) {
          return { doctorId: doctor._id, nearestStartTime: null }; // No availability today
        }

        // Find the nearest start time from today's slots
        const currentTime = new Date(); // Current time
        const nearestSlot = todayAvailability.slots
          .filter((slot) => {
            // Parse start time to Date object for comparison
            const slotTime = new Date(
              `${currentTime.toDateString()} ${slot.startTime}`
            );
            return slotTime > currentTime; // Only consider future slots
          })
          .sort((a, b) => {
            // Sort slots by start time
            const timeA = new Date(
              `${currentTime.toDateString()} ${a.startTime}`
            );
            const timeB = new Date(
              `${currentTime.toDateString()} ${b.startTime}`
            );
            return timeA - timeB;
          })[0]; // Get the earliest slot

        return {
          doctorId: doctor.userId,
          doctorName: doctorData.fName + " " + doctorData.lName,
          doctorEmail: doctorData.email,
          doctorPhone: doctorData.phone,
          nearestStartTime: nearestSlot ? nearestSlot.startTime : "no slots",
        };
      })
    );
    res.status(200).json({
      status: "success",
      data: nearestSlots,
    });
  }
);

exports.bookAppointmentForVisitor = asyncHandler(async (req, res, next) => {
  const { doctorId, startTime, endTime, notes, patientEmail } = req.body;
  const patient = await User.findOne({ email: patientEmail });
  const appointment = await Appointment.create({
    patientId: patient._id,
    doctorId,
    date: new Date().toISOString().split("T")[0],
    startTime,
    endTime: endTime || addOneHour(startTime),
    notes: notes || "N/A",
    status: "completed",
    paid: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

function addOneHour(time) {
  let [hours, minutes] = time.split(":").map(Number);
  hours += 1;
  if (hours === 24) {
    hours = 0;
  }
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}
