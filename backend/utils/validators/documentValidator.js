const { body, check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Patient = require("../../models/patientModel");

exports.createDocumentValidator = [
  check("name").notEmpty().withMessage("document name required"),
  check("data")
    .notEmpty()
    .withMessage("document data required")
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("No file uploaded");
      }
      const fileExtension = req.file.mimetype.split("/")[1];
      const allowedExtensions = ["pdf", "png", "jpg", "jpeg"];
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          "Invalid file type. Only PDF, PNG, JPG, and JPEG are allowed"
        );
      }
      return true;
    }),
  check("patientId")
    .notEmpty()
    .withMessage("patient id required")
    .isMongoId()
    .withMessage("invalid patient id")
    .custom(async (value) => {
      const patient = await Patient.findById(value);
      if (!patient) {
        return Promise.reject("patient not found");
      }
    }),
  check("notes").optional().notEmpty().withMessage("you provided empty notes"),
  validatorMiddleware,
];

exports.getDocumentValidator = [
  check("id").notEmpty().withMessage("Document id is required"),
  validatorMiddleware,
];

exports.updateDocumentValidator = [
  check("id").notEmpty().withMessage("Document id is required"),
  validatorMiddleware,
];

exports.deleteDocumentValidator = [
  check("id").notEmpty().withMessage("Document id is required"),
  validatorMiddleware,
];
