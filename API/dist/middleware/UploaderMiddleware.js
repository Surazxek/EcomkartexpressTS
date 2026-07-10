"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer")); // need -D @types/multer
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploader = () => {
    // Local Storage (Disk Storage)
    const myStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const fileLocation = path_1.default.join(process.cwd(), "public/uploads");
            if (!fs_1.default.existsSync(fileLocation)) {
                fs_1.default.mkdirSync(fileLocation, { recursive: true });
            }
            cb(null, fileLocation);
        },
        filename: (req, file, cb) => {
            // a.jpg
            const filename = Date.now() + "-" + file.originalname;
            cb(null, filename);
        },
    });
    // external/cloud (s3bucket, Digital ocean, cloudinary)
    return (0, multer_1.default)({
        storage: myStorage,
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split(".").pop();
            if (["jpg", "jpeg", "png", "svg", "webp", "pdf"].includes(ext?.toLowerCase())) {
                cb(null, true);
            }
            else {
                cb(new Error("File format not supported"));
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    });
};
exports.default = uploader;
//# sourceMappingURL=UploaderMiddleware.js.map