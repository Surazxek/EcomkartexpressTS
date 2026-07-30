"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = __importDefault(require("../app/auth/authRoute"));
const categoryRoute_1 = __importDefault(require("../app/category/categoryRoute"));
const product_Route_1 = __importDefault(require("../app/products/product Route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/auth", authRoute_1.default);
mainRouter.use("/category", categoryRoute_1.default);
mainRouter.use("/product", product_Route_1.default);
exports.default = mainRouter;
//# sourceMappingURL=mainRouter.js.map