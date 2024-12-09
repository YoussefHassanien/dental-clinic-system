const express = require("express");
const {
  getMaterial,
  getMaterials,
  createMaterial,
  updateMaterial,
  deletMaterial,
  addQuantity,
} = require("../services/materialServices.js");

const {
  getMaterialValidator,
  createMaterialValidator,
  updateMaterialValidator,
  deleteMaterialValidator,
  addQuantityValidator,
} = require("../utils/validators/materialValidator.js");

const router = express.Router();

router.route("/").get(getMaterials).post(createMaterialValidator, createMaterial);

router
  .route("/:id")
  .get(getMaterialValidator, getMaterial)
  .put(updateMaterialValidator, updateMaterial)
  .delete(deleteMaterialValidator, deletMaterial);
router.route("/addQuantity/:id").put(addQuantityValidator, addQuantity);

module.exports = router;
