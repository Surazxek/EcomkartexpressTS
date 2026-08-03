import { Router } from "express";
import authRouter from "../app/auth/auth.route";
import categoryRouter from "../app/category/category.route";
import productRouter from "../app/products/product.route";
import cartRouter from "../app/cart/cart.route";
import wishListRouter from "../app/wishlist/wishlist.route";
import orderRouter from "../app/order/order.route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/category", categoryRouter )

mainRouter.use ("/product", productRouter)

mainRouter.use ("/cart", cartRouter)


mainRouter.use('/wishlist', wishListRouter)

mainRouter.use('/order', orderRouter)

export default mainRouter;
