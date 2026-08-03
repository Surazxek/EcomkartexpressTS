import { type Request, type Response, type NextFunction } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { prodcutModel } from "../products/product.model";
import CustomError from "../../middleware/Error-handler";
import { ordermodel } from "./order.model";

class OrderController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user._id;

    const { items } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const product = await prodcutModel.findById(item.product);

      if (!product) {
        throw new CustomError("Product not found", 404);
      }

      if (product.stock < item.quantity) {
        throw new CustomError(
          `${product.name} has only ${product.stock} item(s) left`,
          400,
        );
      }

      totalAmount += product.price * item.quantity;
    }

    const order = await ordermodel.create({
      user,
      items,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      status: "success",
      message: "Order created successfully",
      data: order,
    });
  });

  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    // Step 1: Get every order from database
    const allorders = await ordermodel
      .find()
      .sort({ createdAt: -1 })
      .populate("user", "first_name last_name email")
      .populate("items.product");

    // Step 2: Return Response
    res.status(200).json({
      success: true,
      status: "success",
      message: "All orders fetched successfully",
      data: allorders,
    });
  });

  getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    // Get logged in user's id from JWT
    const userId = req.user._id;

    // Step 2
    // Find only those orders whose user field matches logged in user
    const orders = await ordermodel
      .find({ user: userId })
      .populate("items.product");

    // Step 3
    // Return Orders
    res.status(200).json({
      success: true,
      status: "success",
      message: "Your orders fetched successfully",
      data: orders,
    });
  });


  getByID =  asyncHandler(async(req: Request, res: Response) => {
    const orderId = req.params.id 

    const findOrderById = await ordermodel.findById(orderId).populate('user', '-password').populate('items.product').sort({createdAt: -1})

    if(!findOrderById) {
      throw new CustomError("OrderId not found", 400)

    }

    res.status(200).json({
      message: "Order deleted sucessfully",
      success: true,
      status: 'success',
      data: findOrderById

    })
    });

  //Admin le matra garxa del
  removeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("ID:", id);

  // Find and Delete Order
  const deletedOrder = await ordermodel.findByIdAndDelete(id);

  console.log("Deleted Order:", deletedOrder);

  // Check if order exists
  if (!deletedOrder) {
    throw new CustomError("Order not found", 404);
  }

  // Success Response
  res.status(200).json({
    success: true,
    status: "success",
    message: "Order deleted successfully",
    data: deletedOrder,
  });
});

//update Order admin
updateOrder = asyncHandler(async(req:Request, res:Response) => {
   const {id} = req.params
   const {status} = req.body;

   if(!status) {
    throw new CustomError("Status is required to update order", 400)
   }

   const order = await ordermodel.findByIdAndUpdate(id,{status}, {new:true})

   if(!order) {
    throw new CustomError("Order not found", 400)
   }
  
    res.status(200).json({
    success: true,
    status: "success",
    message: "Order updated successfully",
    data: order,
  });
   

})


  
}

export const orderController = new OrderController()
