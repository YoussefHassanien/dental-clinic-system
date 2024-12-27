const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "service name must be unique"],
      required: [true, "service name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    price: {
      type: String,
      required: [true, "service price required"],
    },
    dates: {
      type: [String],
      required: [true, "service dates required"],
    },
    paid: {
      type: String,
      default: 0,
    },
    lastPaid: {
      type: Date,
      default: Date.now(),
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "doctor id required"],
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: [true, "appointment id required"],
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
