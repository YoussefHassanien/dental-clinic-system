const express = require("express");
const {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
  deletPatient,
} = require("../services/patientService");

// const {
//   getSupplierValidator,
//   createSupplierValidator,
//   updateSupplierValidator,
//   deleteSupplierValidator,
// } = require("../utils/validators/supplierValidator.js");

const router = express.Router();

router.route("/").get(getPatients).post(createPatient);

router.route("/:id").get(getPatient).put(updatePatient).delete(deletPatient);

module.exports = router;
