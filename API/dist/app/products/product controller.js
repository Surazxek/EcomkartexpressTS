"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_model_1 = require("./product.model");
const async_handler_1 = require("../../utils/async-handler");
const Error_handler_1 = __importDefault(require("../../middleware/Error-handler"));
const category_model_1 = require("../category/category.model");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudniary_comfig_1 = __importStar(require("../../config/cloudniary.comfig"));
class ProductController {
    constructor() {
        this.create = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const uploadedFiles = [];
            try {
                const { name, price, category, description, stock, isFeatured, } = req.body;
                const files = req.files;
                const coverImage = files?.coverImage?.[0]
                    ? {
                        path: files.coverImage[0].path,
                        public_id: files.coverImage[0].filename,
                    }
                    : null;
                if (coverImage) {
                    uploadedFiles.push(coverImage.public_id);
                }
                const images = (files?.images || []).map((file) => {
                    uploadedFiles.push(file.filename);
                    return {
                        path: file.path,
                        public_id: file.filename,
                    };
                });
                if (!mongoose_1.default.Types.ObjectId.isValid(category)) {
                    throw new Error_handler_1.default("Invalid Category ID", 400);
                }
                const existingCategory = await category_model_1.categoryModel.findById(category);
                if (!existingCategory) {
                    throw new Error_handler_1.default("Category not found", 404);
                }
                const product = await product_model_1.prodcutModel.create({
                    name,
                    price: Number(price),
                    category,
                    description,
                    stock: Number(stock),
                    isFeatured: isFeatured === "true",
                    coverImage,
                    images,
                });
                res.status(201).json({
                    success: true,
                    status: "success",
                    message: "Product created successfully",
                    data: product,
                });
            }
            catch (error) {
                if (uploadedFiles.length) {
                    await Promise.all(uploadedFiles.map((publicId) => cloudniary_comfig_1.default.uploader.destroy(publicId)));
                }
                throw error;
            }
        });
        this.getAllProducts = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const products = await product_model_1.prodcutModel.find().populate('category');
            res.status(200).json({
                message: "Products fetched successfully",
                success: true,
                status: "success",
                data: products,
            });
        });
        this.getProductById = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const products = await product_model_1.prodcutModel.findById(id).populate('category');
            if (!products) {
                throw new Error_handler_1.default("Error product not found", 401);
            }
            res.status(200).json({
                message: "Products By Id fetched successfully",
                success: true,
                status: "success",
                data: products,
            });
        });
        this.deleteProduct = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            // 1. get product
            const product = await product_model_1.prodcutModel.findById(id);
            if (!product) {
                throw new Error_handler_1.default("Product not found", 404);
            }
            // 2. product images -> delete
            if (product.coverImage) {
                await (0, cloudniary_comfig_1.removeImages)([product.coverImage]);
            }
            if (product.images && product.images.length > 0) {
                await (0, cloudniary_comfig_1.removeImages)(product.images);
            }
            // 3. delete product
            await product.deleteOne();
            res.status(200).json({
                status: "success",
                success: true,
                message: "Product deleted successfully",
            });
        });
    }
}
exports.productController = new ProductController();
//# sourceMappingURL=product%20controller.js.map