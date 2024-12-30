const express = require("express");
const {
    getContactuss,
    getContactus,
    createContactus,
    updateContactus,
    deleteContactus,
} = require("../services/contactusServices.js");

const {
    getContactusValidator,
    createContactusValidator,
    updateContactusValidator,
    deleteContactusValidator,
} = require("../utils/validators/contactusValidator.js");

const router = express.Router();

router.route("/").get(getContactuss).post(createContactusValidator, createContactus);

router
    .route("/:id")
    .get(getContactusValidator, getContactus)
    .put(updateContactusValidator, updateContactus)
    .delete(deleteContactusValidator, deleteContactus);

module.exports = router;