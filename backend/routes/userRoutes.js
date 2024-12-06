const express = require("express");
const {
  getUser,
  getUsers,
  uploadUserImage,
  resizeImage,
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
const { auth } = require("../services/authServices.js");

const router = express.Router();

router
  .route("/")
  .get(auth, getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
router.put(
  "/change-password/:id",
  updateUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
