const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    bloodType: {
      type: String,
      required: [true, "Blood type is required"],
      trim: true,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood type",
      },
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    wallet: {
      type: mongoose.Schema.ObjectId,
      ref: "Wallet",
      required: [true, "Wallet reference is required"],
      index: true,
    },
    totalVisits: {
      type: Number,
      default: 0,
      min: [0, "Total visits cannot be negative"],
    },
    allergies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
