import { Router } from "express";

import bodyValidator from "../../middleware/validatordto";
import { LoginDTO, RegisterDTO } from "./authDto";
import { userController } from "./authController";

const authRouter = Router();

//registerUser
authRouter.post(
  "/register",
  bodyValidator(RegisterDTO),
  userController.register,
);

authRouter.post("/login", bodyValidator(LoginDTO), userController.login);

export default authRouter;
