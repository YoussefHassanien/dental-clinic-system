const mongoose = require("mongoose");
const contactusSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        trim: true,
        required: [true, "name required"],
        },
        email: {
        type: String,
        required: [true, "email required"],
        },
        message: {
        type: String,
        required: [true, "message required"],
        },
        subject: {
            type: String,
            required: [true, "subject required"],
        },
    },
    { timestamps: true }
    );
const Contactus = mongoose.model("Contactus", contactusSchema);
module.exports = Contactus;