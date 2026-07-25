import { Router } from "express";
import authRouter from "../app/auth/authRoute";
import categoryRouter from "../app/category/categoryRoute";
import productRouter from "../app/products/product Route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/category", categoryRouter )

mainRouter.use ("/product", productRouter)

export default mainRouter;
