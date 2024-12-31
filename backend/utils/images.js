const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  uploadSingleImage,
  uploadSingleFile,
} = require("../middlewares/uploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const { use } = require("../routes/authRoute");
const ApiError = require("../utils/apiError");

exports.uploadUserImage = uploadSingleImage("profileImg");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `doctor-${uuidv4()}-${Date.now()}.jpeg`;
  const directoryPath = path.join(
    __dirname,
    "../../frontend/public/uploads/users"
  );
  // Ensure the directory exists
  if (!fs.existsSync(directoryPath)) {
    console.log("Directory does not exist. Creating it...");
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log("Directory created:", directoryPath);
  } else {
    console.log("Directory already exists:", directoryPath);
  }

  // Check if file exists in the request
  if (req.file) {
    try {
      const filePath = path.join(directoryPath, filename);
      console.log("Saving image to:", filePath);

      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(filePath);

      req.body.profileImg = "uploads/user/" + filename; // Save relative path
      console.log("Image saved successfully!");
      next();
    } catch (error) {
      console.error("Error saving image:", error);
      return res
        .status(500)
        .json({ error: "Error saving image", message: error.message });
    }
  } else {
    console.log("No file received.");
    return res.status(400).json({ error: "No file uploaded" });
  }
});

exports.updateUserImage = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const oldImagePath = user.profileImg;
  if (oldImagePath) {
    const oldImageFullPath = path.join(
      __dirname,
      "../../frontend/public/" + oldImagePath
    );
    if (fs.existsSync(oldImageFullPath)) {
      fs.unlinkSync(oldImageFullPath);
    }
  }
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`; // Generate a new filename
  const directoryPath = path.join(
    __dirname,
    "../../frontend/public/uploads/users"
  );
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    t;
  }
  if (req.file) {
    const filePath = path.join(directoryPath, filename);

    try {
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(filePath);

      req.body.profileImg = "uploads/users/" + filename;
      next();
    } catch (error) {
      console.error("Error processing image:", error);
      return res
        .status(500)
        .json({ error: "Error processing image", message: error.message });
    }
  } else {
    return res.status(400).json({ error: "No file uploaded" });
  }
});

exports.uploadDocumentFile = uploadSingleFile("data");

exports.saveDocumentFile = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("No file uploaded", 400));
  }

  const fileExtension = path.extname(req.file.originalname); // Get the file extension
  const filename = `document-${uuidv4()}-${Date.now()}${fileExtension}`;
  const directoryPath = path.join(
    __dirname,
    "../../frontend/public/uploads/documents"
  );

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true }); // Create directory if it doesn't exist
  }

  const filePath = path.join(directoryPath, filename); // Full path of the file

  // If the file is a PDF, save it directly
  if (fileExtension === ".pdf") {
    fs.writeFileSync(filePath, req.file.buffer);
  } else {
    // If the file is an image, use sharp to process it
    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(filePath);
  }

  req.body.data = "uploads/documents/" + filename;

  next(); // Proceed to the next middleware or route handler
});
