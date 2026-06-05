import { type Request, type Response, type NextFunction } from "express";
import { UserModel } from "./userModel";
import { hash } from "../../utils/bcrypt";
import { compare } from "bcrypt";
import { success } from "zod";

// Register User
class Usercontroller {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // req.body
      console.log(req.body);
      const { email, full_name, password, phone_number } = req.body;

      if (!password) {
        throw new Error("Password is required.");
      }

      const hashedPassword = await hash(password);

      const user = await UserModel.create({
        email,
        full_name,
        password: hashedPassword,
        phone_number,
      });

      if (!user) {
        throw new Error("Registration failed. Try Again");
      }
      res.status(201).json({
        message: "User Registered",
        sucess: true,
        status: "success",
        data: user,
      });

      res.status(201).json({
        message: "User registered successfully",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Something went wrong",
        success: false,
        status: "fail",
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      // body [email, password]
      const { email, password } = req.body;

      if (!email) {
        throw new Error("email is required.");
      }

      if (!password) {
        throw new Error("Password is required.");
      }

      //find user by email
      const user = await UserModel.findOne({ email });
      //no user throw error
      if (!user) {
        throw new Error("User not found");
      }

      // if user compare password it takes 2 things password,hashedpassword
      const isPasswordMatched = await compare(password, user.password);

      //!match pass
      if (!isPasswordMatched) {
        throw new Error("Password doesnt");
      }

      res.status(200).json({
        message: "Login success",
        success: "true",
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error instanceof Error ? error.message : "Something went wrong",
        success: false,
        status: "fail",
      });
    }
  }
}

export const userController = new Usercontroller();
