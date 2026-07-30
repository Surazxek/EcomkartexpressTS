"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("../../middleware/authenticate.middleware");
const product_controller_1 = require("./product controller");
const globalTypes_1 = require("../../types/globalTypes");
const UploaderMiddleware_1 = __importDefault(require("../../middleware/UploaderMiddleware"));
const productRouter = (0, express_1.Router)();
//create Product
productRouter.post("/", (0, authenticate_middleware_1.authenticate)(globalTypes_1.onlyAdmin), (0, UploaderMiddleware_1.default)().fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 5 },
]), product_controller_1.productController.create);
productRouter.get("/", product_controller_1.productController.getAllProducts);
productRouter.get("/:id", product_controller_1.productController.getProductById);
// productRouter.put(
//   "/:id",
//   authenticate(onlyAdmin),
//   uploader().fields([
//     { name: "coverImage", maxCount: 1 },
//     { name: "images", maxCount: 5 },
//   ]),
//   productController.updateProduct,
// );
productRouter.delete("/:id", (0, authenticate_middleware_1.authenticate)(globalTypes_1.onlyAdmin), product_controller_1.productController.deleteProduct);
exports.default = productRouter;
//# sourceMappingURL=product%20Route.js.map