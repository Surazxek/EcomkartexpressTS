import { type Request, type Response, type NextFunction } from "express";
import { Types } from "mongoose";
import { UserModel } from "./userModel";
import { hash } from "../../utils/bcrypt";
import { compare } from "bcrypt";
import CustomError from "../../middleware/Error-handler";
import { asyncHandler } from "../../utils/async-handler";
import { generateJWTToken } from "../../utils/jwt.utils";
import { Role, type JWTPayload } from "../../types/globalTypes";

class UserController {
  // Register User
  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { email, first_name, last_name, password, phone_number } = req.body;

      if (!password) {
        throw new CustomError("Password is required.", 400);
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
      throw new CustomError("This user already exists.", 409);
    }

      const hashedPassword = await hash(password);

      const user = await UserModel.create({
        email,
        first_name,
        last_name,
        password: hashedPassword,
        phone_number,
      });

      if (!user) {
        throw new CustomError("Registration failed. Try Again", 409);
      }

      res.status(201).json({
        message: "User registered successfully",
        success: true,
        status: "success",
        data: user,
      });
    },
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new CustomError("Invalid email or password", 401);
      }

      // Compare credentials
      const isPasswordMatched = await compare(password, user.password);
      if (!isPasswordMatched) {
        throw new CustomError("Invalid email or password doesn't match", 401);
      }

      //jwt here

      const payload: JWTPayload = {
        first_name: user.first_name,
        last_name: user.last_name,

        _id: user._id as Types.ObjectId,
        role: user.role as Role,
        email: user.email,
      };

      const token = generateJWTToken(payload);

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge:
            parseInt(process.env.COOKIE_EXPIRES_IN ?? "1") * 60 * 60 * 1000,
          secure: false,
        })
        .json({
          message: "Login success",
          success: true,
          status: "success",
          data: {
            user,
            access_token: token,
          },
        });
    },
  );

  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res
        .status(200)
        .clearCookie("access_token", {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
        })
        .json({
          message: "Logout success",
          success: true,
          status: "success",
          data: null,
        });
    },
  );
}

export const userController = new UserController();
