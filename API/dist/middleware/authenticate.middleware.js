"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const Error_handler_1 = __importDefault(require("./Error-handler"));
const jwt_utils_1 = require("../utils/jwt.utils");
const userModel_1 = require("../app/auth/userModel");
const authenticate = (roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.access_token;
            if (!token)
                throw new Error_handler_1.default("Unauthorized, Access Denied", 401);
            const decoded = (0, jwt_utils_1.decodeJWTToken)(token);
            if (!decoded)
                throw new Error_handler_1.default("Unauthorized", 401);
            // Expiration check
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                res.clearCookie("access_token", { httpOnly: true });
                throw new Error_handler_1.default("Token Expired. Access Denied", 401);
            }
            // User existence check
            const user = await userModel_1.UserModel.findOne({ email: decoded.email });
            if (!user)
                throw new Error_handler_1.default("Unauthorized, User not found", 401);
            // Role check (if provided)
            if (roles?.length && !roles.includes(user.role)) {
                throw new Error_handler_1.default("Forbidden, Insufficient role", 403);
            }
            // Attach user to request
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map