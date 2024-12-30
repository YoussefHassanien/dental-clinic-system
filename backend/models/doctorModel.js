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
    appointmentFee: {
      type: String,
      default: 200,
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
    numberOfSessions: {
      type: Number,
      default: 0,
    },
    specialities: {
      type: [String],
      default: [],
      required: [true, "Specialities are required"],
    },
    experience: {
      type: Number,
      default: 0,
    },
    languages: {
      type: [String],
      default: [],
    },
    thisWeekAvailability: {
      type: [
        {
          day: {
            type: String,
            enum: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            required: true,
          },
          slots: {
            type: [
              {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
              },
            ],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
