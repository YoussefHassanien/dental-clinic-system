const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const Patient = require("../models/patientModel");
const Wallet = require("../models/walletModel");
const { createToken } = require("../utils/createToken");

// @desc    signup user
// @route   GET /api/v1/auth/signup
// @access  public
exports.signup = asyncHandler(async (req, res, next) => {
  const {
    fName,
    lName,
    ssn,
    title,
    gov,
    district,
    city,
    dateOfBirth,
    gender,
    email,
    phone,
    profileImg,
    password,
    bloodType,
    allergies,
    cardNumber,
    cvv,
    credit,
  } = req.body;
  let wallet;

  if (cardNumber && cvv && credit) {
    wallet = await Wallet.create({
      cardNumber,
      cvv,
      credit,
    });
  }

  const user = await User.create({
    fName,
    lName,
    ssn,
    title: title || "N/A",
    gov: gov || "Not provided",
    district: district || "Not provided",
    city: city || "Not provided",
    phone: phone || "Not provided",
    dateOfBirth,
    gender,
    email,
    phone,
    profileImg: profileImg || "Not provided",
    password,
    role: "patient",
  });

  const patient = await Patient.create({
    bloodType,
    userId: user._id,
    wallet: wallet ? wallet._id : "Not provided",
    allergies: allergies || [],
  });

  const token = createToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    role: user.role,
  });
});

// @desc    login user
// @route   GET /api/v1/auth/login
// @access  public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    role: user.role,
  });
});

exports.auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Please login to get access", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User not found", 401));
  }
  const passwordChangedTimeStamp = parseInt(
    user.passwordChangedAt.getTime() / 1000,
    10
  );
  if (passwordChangedTimeStamp > decoded.iat) {
    return next(new ApiError("user changed password, login again", 401));
  }
  req.user = user;
  next();
});

// @desc    Authorization (User Permissions)
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
