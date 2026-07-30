"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudniary_comfig_1 = __importDefault(require("../config/cloudniary.comfig"));
const uploader = () => {
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudniary_comfig_1.default,
        params: () => ({
            folder: "E-comKart",
        }),
    });
    return (0, multer_1.default)({
        storage,
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        fileFilter: (req, file, cb) => {
            const allowed = [".jpg", ".jpeg", ".png", ".pdf"];
            const ext = path_1.default.extname(file.originalname).toLowerCase();
            if (allowed.includes(ext)) {
                cb(null, true);
            }
            else {
                cb(new Error("Only .jpg, .jpeg, .png and .pdf files are allowed"));
            }
        },
    });
};
exports.default = uploader;
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import crypto from "crypto";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// const uploader = () => {
//   const uploadPath = path.join(process.cwd(), "public/uploads");
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true });
//       }
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname).toLowerCase();
//       cb(null, `${crypto.randomUUID()}${ext}`);
//     },
//   });
//   return multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
//     fileFilter: (req, file, cb) => {
//       const allowed = [".jpg", ".jpeg", ".png", ".pdf"];
//       const ext = path.extname(file.originalname).toLowerCase();
//       if (allowed.includes(ext)) {
//         cb(null, true); // accept file
//       } else {
//         cb(new Error("Only .jpg, .jpeg, .png, and .pdf files are allowed"));
//       }
//     },
//   });
// };
// export default uploader;
//# sourceMappingURL=UploaderMiddleware.js.map