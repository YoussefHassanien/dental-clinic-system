const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Service = require("../../models/serviceModel");

exports.createServiceValidator = [
  check("name")
    .notEmpty()
    .withMessage("service name must be specified")
    .isLength({ min: 3 })
    .withMessage("service name is too short")
    .isLength({ max: 50 })
    .withMessage("service name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
    .custom((value) =>
      Service.findOne({ name: value }).then((service) => {
        if (service) {
          return Promise.reject("this service already exists");
        }
      })
    ),
  check("price")
    .notEmpty()
    .withMessage("price must be specified")
    .isLength({ max: 15 })
    .withMessage("price is too long"),
  validatorMiddleware,
];

exports.getServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service ID format"),
  validatorMiddleware,
];

exports.updateServiceValidator = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("service name must be specified")
    .isLength({ min: 3 })
    .withMessage("service name is too short")
    .isLength({ max: 50 })
    .withMessage("service name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
    .custom((value) =>
      Service.findOne({ name: value }).then((service) => {
        if (service) {
          return Promise.reject("this service already exists");
        }
      })
    ),
  check("price")
    .optional()
    .notEmpty()
    .withMessage("price must be specified")
    .isLength({ max: 15 })
    .withMessage("price is too long"),
  validatorMiddleware,
];

exports.deleteServiceValidator = [
  check("id").isMongoId().withMessage("Invalid service ID format"),
  validatorMiddleware,
];
