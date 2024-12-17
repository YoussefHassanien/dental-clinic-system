const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const factory = require("./handlersFactory");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");

// Upload single image
exports.uploadUserImage = uploadSingleImage("profileImg");
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `doctor-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/doctors/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});

// @desc    add doctor
// @route   GET /api/v1/doctors
// @access  Private/Admin
exports.addDoctor = asyncHandler(async (req, res, next) => {
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
    patients,
    currentPatients,
    rating,
    description,
    numberOfRatings,
    languages,
    specialities,
    experience,
  } = req.body;

  const user = await User.create({
    fName,
    lName,
    ssn,
    title: title || "DR",
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
    role: "doctor",
  });

  const doctor = await Doctor.create({
    userId: user._id,
    patients: patients || [],
    currentPatients: currentPatients || [],
    rating: rating || 1,
    description: description || "",
    numberOfRatings: numberOfRatings || 0,
    languages: languages || ["Arabic"],
    specialities: specialities,
    experience: experience,
  });
  res.status(201).json({
    status: "success",
    data: {
      user,
      doctor,
    },
  });
});

exports.addRating = asyncHandler(async (req, res, next) => {
  const rating = parseFloat(req.body.rating);
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return next(new ApiError("Doctor not found", 404));
  }
  doctor.rating =
    (doctor.rating * doctor.numberOfRatings + rating) /
    (doctor.numberOfRatings + 1);
  doctor.rating = parseFloat(doctor.rating.toFixed(1)); // Round to two decimal places

  doctor.numberOfRatings += 1;
  await doctor.save();
  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});
// @desc    Get list of doctors
// @route   GET /api/v1/doctors
// @access  Private/Admin
exports.getDoctors = factory.getAll(Doctor);

exports.updateDoctor = asyncHandler(async (req, res, next) => {
  const { patients, currentPatients, description } = req.body;
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
    patients,
    currentPatients,
    description,
  });
  if (!doctor) {
    return next(new ApiError("Doctor not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});

// @desc    Get specific doctor by id
// @route   GET /api/v1/doctors/:id
// @access  Private/Admin
exports.getDoctor = factory.getOne(Doctor);

// @desc    Create doctor
// @route   POST  /api/v1/doctors
// @access  Private/Admin
exports.createDoctor = factory.createOne(Doctor);

// @desc    Delete specific doctor
// @route   DELETE /api/v1/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = factory.deleteOne(Doctor);
