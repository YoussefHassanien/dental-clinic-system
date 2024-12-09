const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    supplierId: {
      type: mongoose.Schema.ObjectId,
      ref: "Supplier",
      required: [true, "supplier ID is required"],
      index: true,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
    },
    price: {
        type: String,
        required: [true, "service price required"],
    },
    expired: {
        type: Date,
        required: [true, "expiration date required"],
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
