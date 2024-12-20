const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Patient = require("../models/patientModel");
const Wallet = require("../models/walletModel");

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
  let wallet;
  if (patient.wallet !== "not provided") {
    wallet = await Wallet.findById(patient.wallet);
  }

  res.status(200).json({
    status: "success",
    data: {
      doctorProfile: {
        ...userPlain,
        ...patientPlain,
        wallet: wallet || "not provided",
      },
    },
  });
});
