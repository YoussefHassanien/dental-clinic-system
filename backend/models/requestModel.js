const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor id is required"],
    },
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: [true, "Material id is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "delivared", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
