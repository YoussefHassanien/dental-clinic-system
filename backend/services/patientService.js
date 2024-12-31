const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Patient = require("../models/patientModel");
const Wallet = require("../models/walletModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

// @desc    Get list of patients
// @route   GET /api/v1/patients
// @access  public
exports.getPatients = factory.getAll(Patient);

// @desc    Get specific patient by id
// @route   GET /api/v1/patients/:id
// @access  public
exports.getPatient = factory.getOne(Patient);

// @desc    Create patient
// @route   POST  /api/v1/patients
// @access  Private/Admin
exports.createPatient = factory.createOne(Patient);

// @desc    Update specific patient
// @route   PUT /api/v1/patients/:id
// @access  Private/Admin
exports.updatePatient = factory.updateOne(Patient);

// @desc    Delete specific patient
// @route   DELETE /api/v1/patient/:id
// @access  Private/Admin
exports.deletPatient = factory.deleteOne(Patient);

// @desc    Delete logged patient data
// @route   get /api/v1/patients/me
// @access  Private/Admin
exports.getLoggedPatientData = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const patient = await Patient.findOne({ userId: req.user._id });
  if (!user) {
    return next(new ApiError("user not found", 404));
  }
  if (!patient) {
    return next(new ApiError("Patient not found", 404));
  }
  const patientPlain = patient.toObject();
  const userPlain = user.toObject();
  let doctors = await Doctor.find({ currentPatients: req.user._id });
  let currentDoctors = await Promise.all(
    doctors.map(async (doctor) => {
      const user = await User.findById(doctor.userId);
      return {
        firstname: user.fName,
        lastname: user.lName,
        specialization: doctor.specialities,
        rating: doctor.rating,
        appointmentFee: doctor.appointmentFee,
        email: user.email,
      };
    })
  );

  if (doctors.length === 0) {
    currentDoctors = "no current doctors";
  }
  let wallet;
  if (patient.wallet !== "not provided") {
    wallet = await Wallet.findById(patient.wallet);
  }

  res.status(200).json({
    status: "success",
    data: {
      Profile: {
        ...userPlain,
        ...patientPlain,
        currentDoctors,
        wallet: wallet || "not provided",
      },
    },
  });
});

// @desc    Get list of patients with specific data
// @route   GET /api/v1/patients/summary
// @access  public
exports.getPatientsSummary = asyncHandler(async (req, res, next) => {
  const patients = await Patient.find().populate('userId', 'fName lName email phone');
  const summary = patients.map(patient => ({
    name: `${patient.userId.fName} ${patient.userId.lName}`,
    email: patient.userId.email,
    phone: patient.userId.phone,
    allergies: patient.allergies
  }));
  res.status(200).json({
    status: 'success',
    data: summary
  });
});
