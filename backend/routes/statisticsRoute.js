const express = require("express");
const {
  userStatistics,
  appointmentStatistics,
  feedBackStatistics,
} = require("../services/statisticsServices");

const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();

router.route("/users").get(auth, allowedTo("admin"), userStatistics);
router
  .route("/appointments")
  .get(auth, allowedTo("admin"), appointmentStatistics);
router.route("/feedbacks").get(auth, allowedTo("admin"), feedBackStatistics);

module.exports = router;
