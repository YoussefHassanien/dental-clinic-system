const mongoose = require("mongoose");

const appointmentServiceSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: [true, "appointment id required"],
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "service id required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    amountDue: {
      type: Number,
      required: [true, "amount due required"],
    },
  },
  { timestamps: true }
);

const AppointmentService = mongoose.model(
  "AppointmentService",
  appointmentServiceSchema
);
module.exports = AppointmentService;
