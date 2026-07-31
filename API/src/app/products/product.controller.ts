import { prodcutModel } from "./product.model";
import { type Request, type Response, type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import CustomError from "../../middleware/Error-handler";
import { categoryModel } from "../category/category.model";
import mongoose from "mongoose";
import cloudinary, { removeImages } from "../../config/cloudniary.comfig";

class ProductController {
create = asyncHandler(async (req: Request, res: Response, next:NextFunction) => {
  const uploadedFiles: string[] = [];

  try {
    const {
      name,
      price,
      category,
      description,
      stock,
      isFeatured,
    } = req.body;

    const files = req.files as {
      coverImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const coverImage = files?.coverImage?.[0]
      ? {
          path: files.coverImage[0].path,
          public_id: files.coverImage[0].filename,
        }
      : null;

    if (coverImage) {
      uploadedFiles.push(coverImage.public_id);
    }

    const images = (files?.images || []).map((file) => {
      uploadedFiles.push(file.filename);

      return {
        path: file.path,
        public_id: file.filename,
      };
    });

    if (!mongoose.Types.ObjectId.isValid(category)) {
      throw new CustomError("Invalid Category ID", 400);
    }

    const existingCategory = await categoryModel.findById(category);

    if (!existingCategory) {
      throw new CustomError("Category not found", 404);
    }

    const product = await prodcutModel.create({
      name,
      price: Number(price),
      category,
      description,
      stock: Number(stock),
      isFeatured: isFeatured === "true",
      coverImage,
      images,
    });

    res.status(201).json({
      success: true,
      status: "success",
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {

    if (uploadedFiles.length) {
      await Promise.all(
        uploadedFiles.map((publicId) =>
          cloudinary.uploader.destroy(publicId)
        )
      );
    }

    throw error;
  }
});

  getAllProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const products = await prodcutModel.find().populate('category');
      res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        status: "success",
        data: products,
      });
    },
  );

  getProductById = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const products = await prodcutModel.findById(id).populate('category')

    if(!products){
        throw new CustomError("Error product not found", 401)
    }
     res.status(200).json({
        message: "Products By Id fetched successfully",
        success: true,
        status: "success",
        data: products,
      });
  })

 


deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // 1. get product
  const product = await prodcutModel.findById(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // 2. product images -> delete
  if (product.coverImage) {
    await removeImages([product.coverImage]);
  }

  if (product.images && product.images.length > 0) {
    await removeImages(product.images as any[]);
  }

  // 3. delete product
  await product.deleteOne();

  res.status(200).json({
    status: "success",
    success: true,
    message: "Product deleted successfully",
  });
});

}

export const productController = new ProductController();
