const express = require("express");
const {
  getDoctor,
  getDoctors,
  addDoctor,
  addRating,
  updateDoctor,
  deleteDoctor,
  createDoctor,
  uploadUserImage,
  resizeImage,
  getLoggedDoctorData,
} = require("../services/doctorServices.js");

const {
  getDoctorValidator,
  addRatingValidator,
  addDoctorValidator,
  updateDoctorValidator,
  createDoctorValidator,
  deleteDoctorValidator,
} = require("../utils/validators/doctorValidator.js");

const { auth } = require("../services/authServices");

const router = express.Router();

router.route("/").get(getDoctors).post(createDoctorValidator, createDoctor);
router.route("/me").get(auth, getLoggedDoctorData);
router
  .route("/addDoctor")
  .post(uploadUserImage, resizeImage, addDoctorValidator, addDoctor);

router
  .route("/:id")
  .get(getDoctorValidator, getDoctor)
  .put(updateDoctorValidator, updateDoctor)
  .delete(deleteDoctorValidator, deleteDoctor);
router.route("/addRating/:id").post(addRatingValidator, addRating);

module.exports = router;
