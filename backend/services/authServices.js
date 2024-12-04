const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const { use } = require("../routes/authRoute");

const createToken = (payload) =>
  jwt.sign({ id: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

// @desc    signup user
// @route   GET /api/v1/auth/signup
// @access  public
exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    data: user,
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
    data: user,
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
  console.log(decoded);
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
