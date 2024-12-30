const express = require("express");
const {
  getTreatmentplan,
  getTreatmentplans,
  createTreatmentplan,
  updateTreatmentplan,
  deleteTreatmentplan,
} = require("../services/treatmentplanServices.js");

const {
    getTreatmentplanValidator,
    createTreatmentplanValidator,
    updateTreatmentplanValidator,
    deleteTreatmentplanValidator,
} = require("../utils/validators/treatmentplanValidator.js");

const router = express.Router();

router.route("/").get(getTreatmentplans).post(createTreatmentplanValidator, createTreatmentplan);

router
   .route("/:id")
    .get(getTreatmentplanValidator, getTreatmentplan)
    .put(updateTreatmentplanValidator, updateTreatmentplan)
    .delete(deleteTreatmentplanValidator, deleteTreatmentplan);

module.exports = router;