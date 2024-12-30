const express = require("express");
const { chatbot } = require("../services/chatBot");

const router = express.Router();

router.route("/").post(chatbot);

module.exports = router;
