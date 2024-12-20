const express = require("express");

const {
  addRequest,
  getRequests,
  deleteRequest,
} = require("../services/requestServices");

const {
  addRequestValidator,
  deleteRequestValidator,
} = require("../utils/validators/requestValidator");
const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();
router
  .route("/")
  .get(auth, allowedTo("doctor", "admin"), getRequests)
  .post(auth, allowedTo("doctor", "admin"), addRequestValidator, addRequest);
router
  .route("/:id")
  .delete(
    auth,
    allowedTo("doctor", "admin"),
    deleteRequestValidator,
    deleteRequest
  );

module.exports = router;
