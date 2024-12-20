const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Material = require("../../models/materialModel");
const Request = require("../../models/requestModel");

exports.addRequestValidator = [
  check("materialId")
    .notEmpty()
    .withMessage("Material id is required")
    .isMongoId()
    .withMessage("Material id must be a valid mongo id")
    .custom(async (value, { req }) => {
      req.body.doctorId = req.user._id;
      const material = await Material.findById(value);
      if (!material) {
        return Promise.reject("Material not found");
      }
    }),
  validatorMiddleware,
];

exports.deleteRequestValidator = [
  check("id")
    .notEmpty()
    .withMessage("Request id is required")
    .isMongoId()
    .withMessage("Request id must be")
    .custom(async (value, { req }) => {
      const request = await Request.findById(value);
      if (!request) {
        return Promise.reject("Request not found");
      }
      if (
        request.doctorId.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return Promise.reject("You are not allowed to delete this request");
      }
    }),
  validatorMiddleware,
];
