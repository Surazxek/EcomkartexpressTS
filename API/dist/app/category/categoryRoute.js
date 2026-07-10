"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_Controller_1 = require("./category.Controller");
const validatordto_1 = __importDefault(require("../../middleware/validatordto"));
const categoryDTO_1 = require("./categoryDTO");
const categoryRouter = (0, express_1.Router)();
//register Category
categoryRouter.post('/', (0, validatordto_1.default)(categoryDTO_1.createCategoryDTO), category_Controller_1.categoryController.create);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoute.js.map