const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Document name required"],
  },
  data: {
    type: String,
    required: [true, "Document data required"],
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "patient id required"],
  },
  notes: {
    type: String,
  },
});

Document = mongoose.model("Document", documentSchema);
module.exports = Document;
