const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Supplier = require("../../models/supplierModel");

exports.createSupplierValidator = [
  check("name")
    .notEmpty()
    .withMessage("supplier name must be specified")
    .isLength({ min: 2 })
    .withMessage("supplier name is too short")
    .isLength({ max: 50 })
    .withMessage("service name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
    .custom((value) =>
      Supplier.findOne({ name: value }).then((supplier) => {
        if (supplier) {
          return Promise.reject("this supplier already exists");
        }
      })
    ),
  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accept EG and SA phone numbers")
    .isLength({ min:11 ,max: 11 })
    .withMessage("phone must be 11 charcters"),
  check("address")
    .optional()
    .notEmpty()
    .withMessage("address must have a value"),
  validatorMiddleware,
];

exports.getSupplierValidator = [
  check("id").isMongoId().withMessage("Invalid supplier ID format"),
  validatorMiddleware,
];

exports.updateSupplierValidator = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("supplier name must be specified")
    .isLength({ min: 2 })
    .withMessage("supplier name is too short")
    .isLength({ max: 50 })
    .withMessage("supplier name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    })
    .custom((value) =>
      Supplier.findOne({ name: value }).then((supplier) => {
        if (supplier) {
          return Promise.reject("this supplier already exists");
        }
      })
    ),
  check("phone")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accept EG and SA phone numbers")
    .isLength({ min:11 ,max: 11 })
    .withMessage("phone must be 11 charcters"),
    check("address")
      .optional()
      .notEmpty()
      .withMessage("address must have a value"),
  validatorMiddleware,
];

exports.deleteSupplierValidator = [
  check("id").isMongoId().withMessage("Invalid supplier ID format"),
  validatorMiddleware,
];
