const express = require("express");
const {
  getService,
  getServices,
  createService,
  updateService,
  deletService,
} = require("../services/serviceService.js");

const {
  getServiceValidator,
  createServiceValidator,
  updateServiceValidator,
  deleteServiceValidator,
} = require("../utils/validators/serviceValidator.js");

const router = express.Router();

router.route("/").get(getServices).post(createServiceValidator, createService);

router
  .route("/:id")
  .get(getServiceValidator, getService)
  .put(updateServiceValidator, updateService)
  .delete(deleteServiceValidator, deletService);

module.exports = router;
