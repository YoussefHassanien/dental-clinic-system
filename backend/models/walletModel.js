const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: [true, "Card number is required"],
      unique: true,
      match: [/^\d{16}$/, "Card number must be exactly 16 digits"],
    },
    cvv: {
      type: String,
      required: [true, "CVV is required"],
      match: [/^\d{3}$/, "CVV must be exactly 3 digits"],
    },
    credit: {
      type: Number,
      required: [true, "Credit amount is required"],
      min: [0, "Credit cannot be negative"],
      set: (value) => parseFloat(value),
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
