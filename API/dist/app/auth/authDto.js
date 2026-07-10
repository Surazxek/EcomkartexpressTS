"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDTO = exports.RegisterDTO = void 0;
const zod_1 = require("zod");
exports.RegisterDTO = zod_1.z.object({
    full_name: zod_1.z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must not exceed 50 characters")
        .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces")
        .trim(),
    email: zod_1.z
        .string()
        .email("Invalid email address")
        .toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must not exceed 30 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    phone_number: zod_1.z
        .string()
        .regex(/^(98|97)\d{8}$/, "Phone number must be a valid Nepal mobile number"),
});
exports.LoginDTO = zod_1.z.object({
    email: zod_1.z
        .string()
        .email("Invalid email address")
        .toLowerCase()
        .trim(),
    password: zod_1.z
        .string()
        .min(5, "Password is required"),
});
//# sourceMappingURL=authDto.js.map