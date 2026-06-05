import { Router } from "express";
import authRouter from "../app/auth/authRoute";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);

export default mainRouter;
