import cloudinary from "./cloudniary.comfig";

export const uploadToCloudinary = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "E-comKart",
  });

  return {
    path: result.secure_url,
    public_id: result.public_id,
  };
};