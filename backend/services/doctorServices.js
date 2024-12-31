const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const factory = require("./handlersFactory");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const { generateWeeklySlots } = require("../utils/slotsCreators");

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
    req.body.profileImg = "uploads/doctors/" + filename;
  }

  next();
});

exports.getDoctorByUserId = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findOne({ userId: req.params.id });
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
exports.getDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: "doctor" });
  const data = await Promise.all(
    doctors.map(async (doctor) => {
      const doctorProfile = await Doctor.findOne({ userId: doctor.id });
      return {
        firstName: doctor.fName,
        lastName: doctor.lName,
        userId: doctor.id,
        gender: doctor.gender,
        totalNumberOfSessions: doctorProfile.numberOfSessions || 0,
        rating: doctorProfile.rating,
        specialities: doctorProfile.specialities || ["Not provided"],
        nearestAppointment: "Not implemented",
        profilePicture: doctor.profileImg,
        yearsOfExperience: doctorProfile.experience || 0,
      };
    })
  );
  res.status(200).json({
    status: "success",
    data,
  });
});

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

exports.addNextWeekSlots = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findOne({ userId: req.user.id });
  if (!doctor) {
    return next(new ApiError("Doctor not found", 404));
  }

  const { startHour, endHour } = req.body;

  if (!startHour || !endHour) {
    return next(
      new ApiError("Both 'startHour' and 'endHour' are required", 400)
    );
  }

  const weeklySlots = generateWeeklySlots(startHour, endHour);

  doctor.thisWeekAvailability = weeklySlots;
  await doctor.save();

  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});

// @desc    Create doctor
// @route   POST  /api/v1/doctors
// @access  Private/Admin
exports.createDoctor = factory.createOne(Doctor);

// @desc    Delete specific doctor
// @route   DELETE /api/v1/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = factory.deleteOne(Doctor);

exports.getLoggedDoctorData = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const doctor = await Doctor.findOne({ userId: req.user._id });
  if (!user) {
    return next(new ApiError("user not found", 404));
  }
  if (!doctor) {
    return next(new ApiError("Doctor not found", 404));
  }
  const doctorPlain = doctor.toObject();
  const userPlain = user.toObject();

  res.status(200).json({
    status: "success",
    data: {
      doctorProfile: { ...userPlain, ...doctorPlain },
    },
  });
});

exports.getDoctorAvailability = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findOne({ userId: req.params.id });
  if (!doctor) {
    return next(new ApiError("Doctor not found", 404));
  }
  const appointments = await Appointment.find({ doctorId: doctor.userId });
  appointments.forEach((appointment) => {
    const date = new Date(appointment.date);
    const day = date.getDay();
    const time = date.getHours();
    doctor.thisWeekAvailability[day][time] = false;
  });

  res.status(200).json({
    status: "success",
    data: {
      availability: doctor.thisWeekAvailability,
    },
  });
});
