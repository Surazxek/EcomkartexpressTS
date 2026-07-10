import { type Request, type Response ,type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { categoryModel } from "./category.model";
import CustomError from "../../middleware/Error-handler";


class ProductController {
  // Create New Category
   create = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const {name, description} = req.body


    const existingCategory = await categoryModel.findOne({ 
    name: { $regex: new RegExp(`^${name.trim()}$`, "i") } 
  });

  if (existingCategory) {
    throw new CustomError("Category with this name already exists", 409); // 409 Conflict
  }


    const category = await categoryModel.create({name, description})

    if(!category) {
        throw new CustomError ("Something went wrong", 500)
    }

    res.status(201).json({
        message: "Category Created",
        success: true,
        status: "success",
        data: category
         })

   })


 // GetAllCategory

 getAllCategories = asyncHandler(async(req: Request, res: Response, next: NextFunction) =>{
    const categories = await categoryModel.find()

     res.status(200).json({
      message: "Categories fetched successfully",
      success: true,
      status: "success",
      data: categories,
    });
 })

 //getCategoryByid /aways params ID
 getCategorybyId = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params

    const category = await categoryModel.findById(id)
    if(!category) {
        throw new CustomError("Category not found", 404)
    }

    res.status(200).json({
        message: "Category fetched successfully",
        sucess: true,
        status: "sucess",
        data: category,
        meta: null
    })
 })

 updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description } = req.body;

  
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new CustomError("Category not found to update", 404);
    }

    res.status(200).json({
      message: "Category updated successfully",
      success: true,
      status: "success",
      data: updatedCategory,
    });
  });

    deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new CustomError("Category not found to delete", 404);
    }

    res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      status: "success",
      data: null,
    });
  });
 


   

}

export const categoryController = new ProductController();