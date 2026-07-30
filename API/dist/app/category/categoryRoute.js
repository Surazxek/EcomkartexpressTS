"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_Controller_1 = require("./category.Controller");
const validatordto_1 = __importDefault(require("../../middleware/validatordto"));
const categoryDTO_1 = require("./categoryDTO");
const authenticate_middleware_1 = require("../../middleware/authenticate.middleware");
const categoryRouter = (0, express_1.Router)();
//register Category
categoryRouter.post('/', (0, authenticate_middleware_1.authenticate)(), (0, validatordto_1.default)(categoryDTO_1.createCategoryDTO), category_Controller_1.categoryController.create);
categoryRouter.get('/', (0, authenticate_middleware_1.authenticate)(), category_Controller_1.categoryController.getAllCategories);
categoryRouter.get('/:id', category_Controller_1.categoryController.getCategorybyId);
categoryRouter.put('/:id', category_Controller_1.categoryController.updateCategory);
categoryRouter.delete('/:id', category_Controller_1.categoryController.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoute.js.map