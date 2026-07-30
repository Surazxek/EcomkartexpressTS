import { Router } from "express";
import authRouter from "../app/auth/authRoute";
import categoryRouter from "../app/category/categoryRoute";
import productRouter from "../app/products/product Route";
import cartRouter from "../app/cart/cartRoute";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/category", categoryRouter )

mainRouter.use ("/product", productRouter)

mainRouter.use ("/cart", cartRouter)

export default mainRouter;
