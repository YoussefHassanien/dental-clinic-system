const express = require("express");
const {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletPatient,
} = require("../services/patientService");

const {
  getPatientValidator,
  createPatientValidator,
  updatePatientValidator,
  deletePatientValidator,
} = require("../utils/validators/patientValidator");

const router = express.Router();

router.route("/").get(getPatients).post(createPatientValidator, createPatient);

router
  .route("/:id")
  .get(getPatientValidator, getPatient)
  .put(updatePatientValidator, updatePatient)
  .delete(deletePatientValidator, deletPatient);

module.exports = router;
