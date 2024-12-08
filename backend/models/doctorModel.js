const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    patients: {
      type: [mongoose.Schema.ObjectId],
      ref: "Patient",
      default: [],
    },
    currentPatients: {
      type: [mongoose.Schema.ObjectId],
      ref: "Patient",
      default: [],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
