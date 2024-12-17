const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "patient id required"],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "doctor id required"],
    },
    date: {
      type: Date,
      required: [true, "appointment date required"],
    },
    notes: {
      type: String,
    },
    feedback: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
