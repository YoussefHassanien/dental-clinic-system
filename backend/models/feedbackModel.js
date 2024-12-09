const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: String,
      required: [true, "Rating is required"],
    },
    notes: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const feedback = mongoose.model("feedback", feedbackSchema);
module.exports = feedback;
