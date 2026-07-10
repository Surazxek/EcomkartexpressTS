"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userModel_1 = require("./userModel");
const bcrypt_1 = require("../../utils/bcrypt");
const bcrypt_2 = require("bcrypt");
const Error_handler_1 = __importDefault(require("../../middleware/Error-handler"));
const async_handler_1 = require("../../utils/async-handler");
const jwt_utils_1 = require("../../utils/jwt.utils");
class UserController {
    constructor() {
        // Register User
        this.register = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { email, full_name, password, phone_number } = req.body;
            if (!password) {
                throw new Error_handler_1.default("Password is required.", 400);
            }
            const hashedPassword = await (0, bcrypt_1.hash)(password);
            const user = await userModel_1.UserModel.create({
                email,
                full_name,
                password: hashedPassword,
                phone_number,
            });
            if (!user) {
                throw new Error_handler_1.default("Registration failed. Try Again", 409);
            }
            res.status(201).json({
                message: "User registered successfully",
                success: true,
                status: "success",
                data: user,
            });
        });
        this.login = (0, async_handler_1.asyncHandler)(async (req, res, next) => {
            const { email, password } = req.body;
            // Find user by email
            const user = await userModel_1.UserModel.findOne({ email });
            if (!user) {
                throw new Error_handler_1.default("Invalid email or password", 401);
            }
            // Compare credentials
            const isPasswordMatched = await (0, bcrypt_2.compare)(password, user.password);
            if (!isPasswordMatched) {
                throw new Error_handler_1.default("Invalid email or password", 401);
            }
            //jwt here
            const payload = {
                full_name: user.full_name,
                _id: user._id, // Explicitly cast the Mongoose field to Types.ObjectId
                role: user.role,
                email: user.email,
            };
            const token = (0, jwt_utils_1.generateJWTToken)(payload);
            res
                .status(200)
                .cookie("access_token", token, {
                httpOnly: true,
                maxAge: parseInt(process.env.COOKIE_EXPIRES_IN ?? "1") * 60 * 60 * 1000,
                secure: true,
            })
                .json({
                message: "Login success",
                success: true,
                status: "success",
                data: {
                    user,
                    access_token: token,
                },
            });
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=authController.js.map