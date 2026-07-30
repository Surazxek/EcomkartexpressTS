"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudniary_comfig_1 = __importDefault(require("./cloudniary.comfig"));
const uploadToCloudinary = async (filePath) => {
    const result = await cloudniary_comfig_1.default.uploader.upload(filePath, {
        folder: "E-comKart",
    });
    return {
        path: result.secure_url,
        public_id: result.public_id,
    };
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=uploadtocloudniaryveryfy.js.map