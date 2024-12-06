const express = require("express");
const {
  getSupplier,
  getSuppliers,
  createSupplier,
  updateSupplier,
  deletSupplier,
} = require("../services/supplierServices.js");

const {
  getSupplierValidator,
  createSupplierValidator,
  updateSupplierValidator,
  deleteSupplierValidator,
} = require("../utils/validators/supplierValidator.js");

const router = express.Router();

router.route("/").get(getSuppliers).post(createSupplierValidator, createSupplier);

router
  .route("/:id")
  .get(getSupplierValidator, getSupplier)
  .put(updateSupplierValidator, updateSupplier)
  .delete(deleteSupplierValidator, deletSupplier);

module.exports = router;
