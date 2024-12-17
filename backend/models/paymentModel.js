const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    appointmentServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppointmentService",
      required: [true, "appointment service id required"],
    },
    amountPaid: {
      type: Number,
      required: [true, "amount paid required"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
