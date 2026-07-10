"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatordto_1 = __importDefault(require("../../middleware/validatordto"));
const authDto_1 = require("./authDto");
const authController_1 = require("./authController");
const authRouter = (0, express_1.Router)();
//registerUser
authRouter.post("/register", (0, validatordto_1.default)(authDto_1.RegisterDTO), authController_1.userController.register);
authRouter.post("/login", (0, validatordto_1.default)(authDto_1.LoginDTO), authController_1.userController.login);
exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map