import { Router } from "express";
import authRouter from "../app/auth/authRoute";
import categoryRouter from "../app/category/categoryRoute";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

mainRouter.use("/category", categoryRouter )

export default mainRouter;
