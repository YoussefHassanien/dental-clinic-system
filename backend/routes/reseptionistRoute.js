const express = require("express");
const { getAllTodayAppointments } = require("../services/receptionistServices");

const router = express.Router();

router.route("/today").get(getAllTodayAppointments);

module.exports = router;
