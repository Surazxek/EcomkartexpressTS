import { UserModel } from './../auth/userModel';
import { type Request, type Response,type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import CustomError from "../../middleware/Error-handler";
import { prodcutModel } from "../products/product.model";


class WishlistController {
  
  createWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const { productId } = req.body;

   if (!productId) throw new CustomError("ProductId is required", 400);

  const product = await prodcutModel.findById(productId);
  if (!product) throw new CustomError("Product not found", 400);

  const user = await UserModel.findById(userId);
  if (!user) throw new CustomError("User not found", 400);

  // Toggle product in wishlist
  const exists = user.wishlist.some(id => id.toString() === productId);
  const updatedWishlist = exists
    ? user.wishlist.filter(id => id.toString() !== productId)
    : [...user.wishlist, product._id];

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    { wishlist: updatedWishlist },
    { new: true }
  ).populate("wishlist", "name price");

    // 6. Respond
    res.status(201).json({
      message: exists ? "Removed from wishlist" : "Added to wishlist",
      status: "success",
      success: true,
      data: updatedUser?.wishlist,
    });
  });

 
  getWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).populate("wishlist", "name price");
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    res.status(200).json({
      message: "Wishlist fetched",
      status: "success",
      success: true,
      data: user.wishlist,
    });
  });

  clearWishlist = asyncHandler(async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      { wishlist: [] },
      { new: true }
    );

    res.status(200).json({
      message: "Wishlist cleared",
      success: true,
      data: user?.wishlist,
    });
  });
}

export const wishlistController = new WishlistController();