const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Material = require("../../models/materialModel");
const Supplier = require("../../models/supplierModel"); // Adjust the path as necessary

exports.createMaterialValidator = [
  check("name")
    .notEmpty()
    .withMessage("Material name must be specified")
    .isLength({ min: 3 })
    .withMessage("Material name is too short")
    .isLength({ max: 100 })
    .withMessage("material name is too long")
    .custom((value) =>
      Material.findOne({ name: value }).then((Material) => {
        if (Material) {
          return Promise.reject("this Material already exists");
        }
      })
    ),
  check("quantity")
    .notEmpty()
    .withMessage("quantity must be specified")
    .isNumeric()
    .withMessage("quantity must be a number")
    .custom((value) => {
        if (value < 0) {
            throw new Error("Quantity must be a positive number");
        }
        return true;
    }),
  check("supplierId")
    .notEmpty()
    .withMessage("supplier ID must be specified")
    .isMongoId()
    .withMessage("Invalid supplier ID format")
    .custom(async (value) => {
        const supplier = await Supplier.findById(value);
        if (!supplier) {
            throw new Error("Supplier ID does not exist");
        }
    }),
  check("description")
    .notEmpty()
    .withMessage("Description must be specified")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters long"),
  check("price")
    .notEmpty()
    .withMessage("price must be specified")
    .isLength({ max: 15 })
    .withMessage("price is too long")
    .custom((value) => {
        if (value < 0) {
            throw new Error("Price must be a positive number");
        }
        return true;
    }),
  check("expired")
    .notEmpty()
    .withMessage("Expiration date required")
    .isDate()
    .withMessage("Expiration date is invalid")
    .custom((value) => {
        const currentDate = new Date();
        const expirationDate = new Date(value);
        if (expirationDate < currentDate) {
            throw new Error("Expiration date has already passed");
        }
        return true;
    }),
  validatorMiddleware,
];

exports.getMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid Material ID format"),
  validatorMiddleware,
];

exports.updateMaterialValidator = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Material name must be specified")
    .isLength({ min: 3 })
    .withMessage("Material name is too short")
    .isLength({ max: 100 })
    .withMessage("Material name is too long")
    .custom((value) =>
      Material.findOne({ name: value }).then((material) => {
        if (material) {
          return Promise.reject("This material already exists");
        }
      })
    ),
  check("quantity")
    .optional()
    .notEmpty()
    .withMessage("Quantity must be specified")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .custom((value) => {
        if (value < 0) {
            throw new Error("Quantity must be a positive number");
        }
        return true;
    })
    .custom(async (value, { req }) => {
        const materialId = req.params.id; // Assuming the material ID is passed as a URL parameter
        const material = await Material.findById(materialId);
        if (!material) {
            throw new Error("Material not found");
        }
        const newQuantity = material.quantity + parseInt(value, 10);
        material.quantity = newQuantity;
        await material.save();
        return true;
    }),
  check("supplierId")
    .optional()
    .notEmpty()
    .withMessage("Supplier ID must be specified")
    .isMongoId()
    .withMessage("Invalid supplier ID format")
    .custom(async (value) => {
        const supplier = await Supplier.findById(value);
        if (!supplier) {
            throw new Error("Supplier ID does not exist");
        }
    }),
  check("description")
    .optional()
    .notEmpty()
    .withMessage("Description must be specified")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters long"),
  check("price")
    .optional()
    .notEmpty()
    .withMessage("Price must be specified")
    .isLength({ max: 15 })
    .withMessage("Price is too long")
    .custom((value) => {
        if (value < 0) {
            throw new Error("Quantity must be a positive number");
        }
        return true;
    }),
  check("expired")
    .optional()
    .notEmpty()
    .withMessage("Expiration date required")
    .isDate()
    .withMessage("Expiration date is invalid")
    .custom((value) => {
        const currentDate = new Date();
        const expirationDate = new Date(value);
        if (expirationDate < currentDate) {
            throw new Error("Expiration date has already passed");
        }
        return true;
    }),
  validatorMiddleware,
];
exports.addQuantityValidator = [
    check("id").isMongoId().withMessage("Invalid Material ID format"),
    check("quantity")
      .notEmpty()
      .withMessage("Quantity must be specified")
      .isNumeric()
      .withMessage("Quantity must be a number")
      .custom((value) => {
          if (value < 0) {
              throw new Error("Quantity must be a positive number");
          }
          return true;
      }),
      validatorMiddleware,
  ];

exports.deleteMaterialValidator = [
  check("id").isMongoId().withMessage("Invalid Material ID format"),
  validatorMiddleware,
];
