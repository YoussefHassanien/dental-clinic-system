const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  changeUserPassword,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../services/userServices");

const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateUserPasswordValidator,
} = require("../utils/validators/userValidators.js");
const {
  uploadUserImage,
  resizeImage,
  updateUserImage,
} = require("../utils/images");
const { auth } = require("../services/authServices.js");

const router = express.Router();

router
  .route("/")
  .get(auth, getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);
router.route("/me").get(auth, getLoggedUserData, getUser);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, updateUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router.put(
  "/change-password/:id",
  updateUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
