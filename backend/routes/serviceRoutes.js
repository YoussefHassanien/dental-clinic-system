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
  updatePaidValidator,
  deleteServiceValidator,
} = require("../utils/validators/serviceValidator.js");

const { auth, allowedTo } = require("../services/authServices.js");

const router = express.Router();

router
  .route("/")
  .get(auth, allowedTo("admin"), getServices)
  .post(
    auth,
    allowedTo("admin", "doctor"),
    createServiceValidator,
    createService
  );

router
  .route("/:id")
  .get(getServiceValidator, getService)
  .put(updateServiceValidator, updateService)
  .delete(deleteServiceValidator, deletService);

module.exports = router;
