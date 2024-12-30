const mongoose = require("mongoose");
const treatmentplanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of treatment is required"],
      trim: true,
    },
    appointmentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Appointment",
      required: [true, "Appointment ID is required"],
      index: true,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
    },
    startdate: {
        type: Date,
        required: [true, "start date required"],
    },
    enddate: {
        type: Date,
        required: [true, "end date required"],
   },
},
   { timestamps: true }
);

const Treatmentplan = mongoose.model("Treatmentplan", treatmentplanSchema);

module.exports = Treatmentplan;