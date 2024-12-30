const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: [true, "first name required"],
    },
    lName: {
      type: String,
      trim: true,
      required: [true, "last name required"],
    },
    ssn: {
      type: String,
      required: [true, "ssn required"],
      unique: [true, "ssn must be unique"],
    },
    title: String,
    gov: String,
    district: String,
    city: String,
    dateOfBirth: {
      type: Date,
      required: [true, "date of birth required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "gender must be specified"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "password must be at least 6 characters"],
    },
    passwordChangedAt: { type: Date, default: Date.now() },
    role: {
      type: String,
      enum: ["doctor", "patient", "admin", "receptionist"],
      default: "patient",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
