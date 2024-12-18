const express = require("express");
const {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletPatient,
  getLoggedPatientData,
} = require("../services/patientService");

const {
  getPatientValidator,
  createPatientValidator,
  updatePatientValidator,
  deletePatientValidator,
} = require("../utils/validators/patientValidator");

const documentRoute = require("./documnetRoute");
const { auth } = require("../services/authServices");

const router = express.Router();

router.use("/:patientId/documents", documentRoute);
router.use("/me", auth, getLoggedPatientData);
router.route("/").get(getPatients).post(createPatientValidator, createPatient);

router
  .route("/:id")
  .get(getPatientValidator, getPatient)
  .put(updatePatientValidator, updatePatient)
  .delete(deletePatientValidator, deletPatient);

module.exports = router;
