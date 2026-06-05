import multer from "multer"; // need -D @types/multer
import path from "path";
import fs from "fs";

const uploader = () => {
  // Local Storage (Disk Storage)
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const fileLocation = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(fileLocation)) {
        fs.mkdirSync(fileLocation, { recursive: true });
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
  return multer({
    storage: myStorage,
    fileFilter: (req, file, cb) => {
      const ext = file.originalname.split(".").pop() as string;
      if (
        ["jpg", "jpeg", "png", "svg", "webp", "pdf"].includes(
          ext?.toLowerCase(),
        )
      ) {
        cb(null, true);
      } else {
        cb(new Error("File format not supported"));
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
};

export default uploader;