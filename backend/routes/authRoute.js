const express = require("express");
const { signup, login } = require("../services/authServices");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

// router
//   .route("/:id")
//   .get(getUserValidator, getUser)
//   .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
//   .delete(deleteUserValidator, deleteUser);
// router.put(
//   "/change-password/:id",
//   updateUserPasswordValidator,
//   changeUserPassword
// );

module.exports = router;
