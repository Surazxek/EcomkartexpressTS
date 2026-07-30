"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const async_handler_1 = require("../../utils/async-handler");
const category_model_1 = require("./category.model");
const Error_handler_1 = __importDefault(require("../../middleware/Error-handler"));
class ProductController {
    constructor() {
        // Create New Category
        this.create = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { name, description } = req.body;
            const existingCategory = await category_model_1.categoryModel.findOne({
                name: { $regex: new RegExp(`^${name.trim()}$`, "i") }
            });
            if (existingCategory) {
                throw new Error_handler_1.default("Category with this name already exists", 409); // 409 Conflict
            }
            const category = await category_model_1.categoryModel.create({ name, description });
            if (!category) {
                throw new Error_handler_1.default("Something went wrong", 500);
            }
            res.status(201).json({
                message: "Category Created",
                success: true,
                status: "success",
                data: category
            });
        });
        // GetAllCategory
        this.getAllCategories = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const categories = await category_model_1.categoryModel.find();
            res.status(200).json({
                message: "Categories fetched successfully",
                success: true,
                status: "success",
                data: categories,
            });
        });
        //getCategoryByid /aways params ID
        this.getCategorybyId = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const category = await category_model_1.categoryModel.findById(id);
            if (!category) {
                throw new Error_handler_1.default("Category not found", 404);
            }
            res.status(200).json({
                message: "Category fetched successfully",
                sucess: true,
                status: "sucess",
                data: category,
                meta: null
            });
        });
        this.updateCategory = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const { name, description } = req.body;
            const updatedCategory = await category_model_1.categoryModel.findByIdAndUpdate(id, { name, description }, { new: true, runValidators: true });
            if (!updatedCategory) {
                throw new Error_handler_1.default("Category not found to update", 404);
            }
            res.status(200).json({
                message: "Category updated successfully",
                success: true,
                status: "success",
                data: updatedCategory,
            });
        });
        this.deleteCategory = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { id } = req.params;
            const deletedCategory = await category_model_1.categoryModel.findByIdAndDelete(id);
            if (!deletedCategory) {
                throw new Error_handler_1.default("Category not found to delete", 404);
            }
            res.status(200).json({
                message: "Category deleted successfully",
                success: true,
                status: "success",
                data: null,
            });
        });
    }
}
exports.categoryController = new ProductController();
//# sourceMappingURL=category.Controller.js.map