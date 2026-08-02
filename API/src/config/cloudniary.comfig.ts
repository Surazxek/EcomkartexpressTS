import { Schema, Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import CustomError from "../middleware/Error-handler";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface IImages {
  path?: string;
  public_id: string;
  _id?: Schema.Types.ObjectId;
}

export const removeImages = async (images: IImages[]) => {
  try {
    await Promise.all(
      images
        .filter((image) => Boolean(image.public_id))
        .map((image) => cloudinary.uploader.destroy(image.public_id)),
    );
  } catch {
    throw new CustomError("Something went wrong, can't delete images", 500);
  }
};

export default cloudinary;
