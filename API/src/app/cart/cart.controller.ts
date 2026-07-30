import { type Request, type Response, type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { Cart } from "./cartmodel";
import { prodcutModel } from "../products/product.model"; 
import CustomError from "../../middleware/Error-handler";

class CartController {
create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;
  const user = req.user._id;

  // 1. Validate input
  const qty = Number(quantity);
  if (!productId || isNaN(qty) || qty <= 0) {
    throw new CustomError("Valid productId and positive quantity are required", 400);
  }

  // 2. Find or create cart
  let cart = await Cart.findOne({ user });
  if (!cart) {
    cart = new Cart({ user, items: [] });
  }

  // 3. Check product exists
  const product = await prodcutModel.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 400);
  }

  // 4. Update items
  const existingItem = cart.items.find(item => item.product.toString() === productId);

  if (existingItem) {
    existingItem.quantity += qty;
    existingItem.total_price = product.price * existingItem.quantity; // ✅ update item total
  } else {
    cart.items.push({
      product: productId,
      quantity: qty,
      total_price: product.price * qty, // ✅ set item total
    });
  }

  // 5. Recalculate cart total
  cart.total_amount = cart.items.reduce((sum, item) => sum + item.total_price, 0);

  // 6. Save cart
  await cart.save();

  // 7. Respond
  res.status(201).json({
    message: "Cart updated",
    success: true,
    status: "success",
    data: cart,
  });
});


  clearCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;

    const cart = await Cart.findOneAndUpdate(
      { user },
      { items: [] },
      { new: true }
    ); 

    if (!cart) {
      throw new CustomError("Cart not found", 400);
    }

    res.status(200).json({
      message: "Cart Cleared",
      success: true,
      status: "success",
      data: cart,
    });
  });

    getCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user._id;

  const cart = await Cart.findOne({ user }).populate('user', '-password').populate('items.product');

  if (!cart) {
    throw new CustomError("Cart is not created yet", 400);
  }

  res.status(200).json({
    message: "Cart fetched",
    success: true,
    status: "success",
    data: cart,
  });
});



}

export const cartController = new CartController();
