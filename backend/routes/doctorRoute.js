const express = require("express");
const {
  getDoctor,
  getDoctors,
  addDoctor,
  addRating,
  updateDoctor,
  deleteDoctor,
  createDoctor,
  getLoggedDoctorData,
  addNextWeekSlots,
  getDoctorAvailability,
} = require("../services/doctorServices.js");

const {
  getDoctorValidator,
  addRatingValidator,
  addDoctorValidator,
  updateDoctorValidator,
  createDoctorValidator,
  deleteDoctorValidator,
  addNextWeekSlotsValidator,
} = require("../utils/validators/doctorValidator.js");

const { uploadUserImage, resizeImage } = require("../utils/images");

const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();

router.route("/").get(getDoctors).post(createDoctorValidator, createDoctor);
router.route("/me").get(auth, getLoggedDoctorData);
router
  .route("/addDoctor")
  .post(uploadUserImage, resizeImage, addDoctorValidator, addDoctor);
router
  .route("/slots")
  .put(auth, allowedTo("doctor"), addNextWeekSlotsValidator, addNextWeekSlots);
router.route("/:id/slots").get(getDoctorAvailability);

router
  .route("/:id")
  .get(getDoctorValidator, getDoctor)
  .put(updateDoctorValidator, updateDoctor)
  .delete(deleteDoctorValidator, deleteDoctor);
router.route("/addRating/:id").post(addRatingValidator, addRating);

module.exports = router;
