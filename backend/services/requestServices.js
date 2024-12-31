const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Request = require("../models/requestModel");
const Material = require("../models/materialModel");

// @desc    add request
// @route   POST /api/v1/request
// @access  private doctor/admin
exports.addRequest = asyncHandler(async (req, res, next) => {
  const material = await Material.findById(req.body.materialId);
  if (!material) {
    return next(new ApiError("Material not found", 404));
  }
  const request = await Request.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      request,
      material,
    },
  });
});

// @desc    get list all requests
// @route   POST /api/v1/request
// @access  private doctor/admin
exports.getRequests = factory.getAll(Request);

// @desc    delete request
// @route   POST /api/v1/request/:id
// @access  private doctor/admin
exports.deleteRequest = factory.deleteOne(Request);
