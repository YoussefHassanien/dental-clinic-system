const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const ApiError = require("../utils/apiError");
const Document = require("../models/documentModel");
const factory = require("./handlersFactory");
const { uploadSingleFile } = require("../middlewares/uploadImageMiddleware");

// Upload single file
exports.uploadDocumentFile = uploadSingleFile("data");

exports.saveDocumentFile = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("No file uploaded", 400));
  }

  const fileExtension = path.extname(req.file.originalname);
  const filename = `document-${uuidv4()}-${Date.now()}${fileExtension}`;
  const filePath = `uploads/documents/${filename}`;

  if (fileExtension === ".pdf") {
    fs.writeFileSync(filePath, req.file.buffer);
  } else {
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(filePath);
  }

  // Save file path into our db
  req.body.data = filePath;

  next();
});

exports.createFilterObject = (req, res, next) => {
  let filterObj = {};
  if (req.params.patientId) filterObj = { patientId: req.params.patientId };
  req.filterObj = filterObj;
  next();
};

//@desc Create document
//@route POST /api/v1/documentsx
//@access patient/doctor
exports.createDocument = factory.createOne(Document);

//@desc get all documents
//@route GET /api/v1/patient/:id/documents
//@access patient/doctor
exports.getAllDocument = factory.getAll(Document);

//@desc update document
//@route PUT /api/v1/documents/:id
//@access patient/doctor
exports.updateDocument = factory.updateOne(Document);

//@desc get document
//@route GET /api/v1/documents/:id
//@access patient/doctor
exports.getDocument = factory.getOne(Document);

//@desc delete document
//@route DELETE /api/v1/documents/:id
//@access patient/doctor
exports.deleteDocument = factory.deleteOne(Document);
