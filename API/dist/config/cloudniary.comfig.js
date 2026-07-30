"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImages = void 0;
const cloudinary_1 = require("cloudinary");
const Error_handler_1 = __importDefault(require("../middleware/Error-handler"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const removeImages = async (images) => {
    try {
        for (const image of images) {
            await cloudinary_1.v2.uploader.destroy(image.public_id);
        }
    }
    catch {
        throw new Error_handler_1.default("Something went wrong, can't delete images", 500);
    }
};
exports.removeImages = removeImages;
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudniary.comfig.js.map