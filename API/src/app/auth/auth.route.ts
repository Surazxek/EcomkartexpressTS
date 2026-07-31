import { Router } from "express";

import bodyValidator from "../../middleware/validatordto";
import { LoginDTO, RegisterDTO } from "./authDto";
import { userController } from "./auth.Controller";

const authRouter = Router();

//registerUser
authRouter.post(
  "/register",
  bodyValidator(RegisterDTO),
  userController.register,
);

authRouter.post("/login", userController.login);

authRouter.post("/logout", userController.logout);


export default authRouter;
