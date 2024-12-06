const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "supplier name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "supplier number required"],
      unique: true,
      minlength: [11, "phone number must be at least 11 characters"],
    },
    address: {
        type: String,
        required: [true, "supplier address required"],
    },
    averageDeliveryTime: {
        type: String,
        //required: [true, "average time is required"],
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
