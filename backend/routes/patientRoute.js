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

const documentRoute = require("./documnetRoute");

const router = express.Router();
router.use("/:patientId/documents", documentRoute);
router.route("/").get(getPatients).post(createPatientValidator, createPatient);

router
  .route("/:id")
  .get(getPatientValidator, getPatient)
  .put(updatePatientValidator, updatePatient)
  .delete(deletePatientValidator, deletPatient);

module.exports = router;
