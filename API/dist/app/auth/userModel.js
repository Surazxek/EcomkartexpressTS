"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globalTypes_1 = require("../../types/globalTypes");
const UserSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "full_name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password length must be at least 6 characters"],
    },
    phone_number: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(globalTypes_1.Role),
        default: globalTypes_1.Role.USER,
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map