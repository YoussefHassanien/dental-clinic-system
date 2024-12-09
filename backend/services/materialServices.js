const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const Material = require("../models/materialModel");

// @desc    Get list of Materials
// @route   GET /api/v1/Materials
// @access  public
exports.getMaterials = factory.getAll(Material);

// @desc    Get specific Material by id
// @route   GET /api/v1/Materials/:id
// @access  public
exports.getMaterial = factory.getOne(Material);

// @desc    Create Material
// @route   POST  /api/v1/Materials
// @access  Private/Admin
exports.createMaterial = factory.createOne(Material);

// @desc    Update specific Material
// @route   PUT /api/v1/Materials/:id
// @access  Private/Admin
exports.updateMaterial = factory.updateOne(Material);

// @desc    Delete specific Material
// @route   DELETE /api/v1/Material/:id
// @access  Private/Admin
exports.deletMaterial = factory.deleteOne(Material);

// @desc    Add quantity to specific Material
// @route   PATCH /api/v1/Materials/:id/add-quantity
// @access  Private/Admin

exports.addQuantity = async (req, res, next) => {
        
        const materialId = req.params.id;
        const { quantity } = req.body;
        const material = await Material.findById(materialId);
        if (!material) {
            return next(new ApiError("Material not found", 404));
        }

        material.quantity += parseInt(quantity, 10);
        await material.save();

        res.status(200).json({
            status: "success",
            data: {
                material,
            },
        });

};
