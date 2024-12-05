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
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
