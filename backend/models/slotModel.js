const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
      index: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    status: {
      type: String,
      enum: ["onhold", "booked", "cancelled"],
      default: "onhold",
    },
  },
  { timestamps: true }
);

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
