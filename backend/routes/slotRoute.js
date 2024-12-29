const express = require("express");

const { createSlot } = require("../services/slotService");

const { bookSlotValidator } = require("../utils/validators/slotvalidator");
const { auth, allowedTo } = require("../services/authServices");

const router = express.Router();
router.route("/").post(auth, bookSlotValidator, createSlot);

module.exports = router;
