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
        this.create = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { name, description } = req.body;
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
    }
}
exports.categoryController = new ProductController();
//# sourceMappingURL=category.Controller.js.map