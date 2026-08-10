import { pagination } from './../../utils/pagination.utils';
import { prodcutModel } from "./product.model";
import { type Request, type Response, type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import CustomError from "../../middleware/Error-handler";
import { categoryModel } from "../category/category.model";
import mongoose from "mongoose";
import cloudinary, { removeImages } from "../../config/cloudniary.comfig";

// import { IImages } from "../../types/globalTypes";

class ProductController {
  create = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const uploadedFiles: string[] = [];

      try {
        const { name, price, category, description, stock, isFeatured } =
          req.body;

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
              cloudinary.uploader.destroy(publicId),
            ),
          );
        }

        throw error;
      }
    },
  );

getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      query,
      minPrice,
      maxPrice,
      category,
      limit = "10",
      page = "1",
    } = req.query;

    const filter: Record<string, any> = {};

    // Pagination
    const perPage = parseInt(limit as string);
    const currentPage = parseInt(page as string);

    const skip = (currentPage - 1) * perPage;

    // Search name + description
    if (query) {
      filter.$or = [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Fetch products
    const products = await prodcutModel
      .find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    // Count matching products
    const totalData = await prodcutModel.countDocuments(filter);


    const Pagination = pagination(totalData, perPage, currentPage )
    

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      status: "success",

      data: {
        products,

        Pagination
      },
    });
  }
);

  getProductById = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const products = await prodcutModel.findById(id).populate("category");

      if (!products) {
        throw new CustomError("Error product not found", 401);
      }
      res.status(200).json({
        message: "Products By Id fetched successfully",
        success: true,
        status: "success",
        data: products,
      });
    },
  );

  updateProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      // console.log("1. Product ID:", id);

      // console.log("2. Body:", req.body);
      // console.log("3. Files:", req.files);

      const product = await prodcutModel.findById(id);

      console.log("4. Product:", product);

      if (!product) {
        console.log("5. Product Not Found");
        throw new CustomError("Product not found", 404);
      }

      const { name, price, category, description, stock, isFeatured } =
        req.body;

      // console.log(req.body);

      if (name) {
        product.name = name;
        console.log("Updated Name:", product.name);
      }

      if (price) {
        product.price = Number(price);
        console.log("Updated Price:", product.price);
      }

      if (stock) {
        product.stock = Number(stock);
        console.log("Updated Stock:", product.stock);
      }

      if (description) {
        product.description = description;
        console.log("Updated Description:", product.description);
      }

      if (isFeatured !== undefined) {
        product.isFeatured = isFeatured === "true";
        console.log("Updated Featured:", product.isFeatured);
      }

      if (category) {
        console.log("7. Checking Category...");

        if (!mongoose.Types.ObjectId.isValid(category)) {
          throw new CustomError("Invalid Category ID", 400);
        }

        const existingCategory = await categoryModel.findById(category);

        if (!existingCategory) {
          throw new CustomError("Category not found", 404);
        }

        product.category = category;
        console.log("Updated Category");
      }

      console.log("8. Before Save:", product);

      await product.save();

      console.log("9. Product Saved");

      res.status(200).json({
        success: true,
        status: "success",
        message: "Product updated successfully",
        data: product,
      });
    },
  );

  deleteProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      // console.log("1. Product ID:", id);

      const product = await prodcutModel.findById(id);
      //  console.log("2. Product Found:", product);

      if (!product) {
        throw new CustomError("Product not found", 404);
      }

      // Delete Cover Image
      if (product.coverImage) {
        await removeImages([
          {
            path: product.coverImage.path,
            public_id: product.coverImage.public_id,
          },
        ]);
      }

      // Delete Gallery Images
      if (product.images.length > 0) {
        await removeImages(
          product.images.map((image) => ({
            path: image.path ?? "",
            public_id: image.public_id ?? "",
          })),
        );
      }

      // Delete Product
      await product.deleteOne();

      res.status(200).json({
        success: true,
        status: "success",
        message: "Product deleted successfully",
      });
    },
  );
}

export const productController = new ProductController();
