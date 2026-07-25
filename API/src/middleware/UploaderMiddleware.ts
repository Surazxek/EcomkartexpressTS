import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudniary.comfig";

const uploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: () => ({
      folder: "E-comKart",
    }),
  });

  return multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const allowed = [".jpg", ".jpeg", ".png", ".pdf"];
      const ext = path.extname(file.originalname).toLowerCase();

      if (allowed.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .jpeg, .png and .pdf files are allowed"));
      }
    },
  });
};

export default uploader;
















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
