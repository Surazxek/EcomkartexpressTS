import { type Request, type Response, type NextFunction } from "express";
import crypto from "crypto";
import { Types } from "mongoose";
import { UserModel } from "./userModel";
import { hash } from "../../utils/bcrypt";
import { compare } from "bcrypt";
import CustomError from "../../middleware/Error-handler";
import { asyncHandler } from "../../utils/async-handler";
import { generateJWTToken } from "../../utils/jwt.utils";
import { Role, type JWTPayload } from "../../types/globalTypes";
import { sendVerificationEmail } from "../../utils/nodemailer.utils";

class UserController {
  // Register User
register = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const {
      email,
      first_name,
      last_name,
      password,
      phone_number,
    } = req.body;


    // Check password
    if (!password) {
      throw new CustomError(
        "Password is required.",
        400
      );
    }


    // Check existing user
    const existingUser =
      await UserModel.findOne({ email });

    if (existingUser) {
      throw new CustomError(
        "This user already exists.",
        409
      );
    }


    // Hash password
    const hashedPassword =
      await hash(password);


    // Create verification token
    const verificationToken =
      crypto
        .randomBytes(32)
        .toString("hex");


    // Hash verification token
    const hashedToken =
      crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");


    // Create user
    const user =
      await UserModel.create({
        email,
        first_name,
        last_name,
        password: hashedPassword,
        phone_number,

        // Email verification
        isVerified: false,

        // Save hashed token
        emailVerificationToken:
          hashedToken,

        // Token expires in 15 minutes
        emailVerificationExpires:
          new Date(
            Date.now() +
              15 * 60 * 1000
          ),
      });


    if (!user) {
      throw new CustomError(
        "Registration failed. Try Again",
        409
      );
    }


    // Send verification email
    await sendVerificationEmail(
      email,
      verificationToken
    );


    // Response
    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",

      success: true,

      status: "success",
    });
  }
);

  login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const { email, password } = req.body;


    // Find user by email
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new CustomError(
        "Invalid email or password",
        401
      );
    }


    // ⭐ Check email verification
    if (!user.isVerified) {
      throw new CustomError(
        "Please verify your email before logging in.",
        403
      );
    }


    // Compare password
    const isPasswordMatched =
      await compare(
        password,
        user.password
      );

    if (!isPasswordMatched) {
      throw new CustomError(
        "Invalid email or password doesn't match",
        401
      );
    }


    // JWT payload
    const payload: JWTPayload = {
      first_name: user.first_name,

      last_name: user.last_name,

      _id: user._id as Types.ObjectId,

      role: user.role as Role,

      email: user.email,
    };


    // Generate JWT
    const token =
      generateJWTToken(payload);


    // Send response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,

        maxAge:
          parseInt(
            process.env.COOKIE_EXPIRES_IN ?? "1"
          ) *
          60 *
          60 *
          1000,

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
  }
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


  verifyEmail = asyncHandler(
  async (req: Request, res: Response) => {

    const { token } = req.query;

    // Check token
    if (!token || typeof token !== "string") {
      throw new CustomError(
        "Verification token is required.",
        400
      );
    }

    // Hash token from email
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await UserModel.findOne({
      emailVerificationToken: hashedToken,

      emailVerificationExpires: {
        $gt: new Date(),
      },
    });

    // Token invalid or expired
    if (!user) {
      throw new CustomError(
        "Invalid or expired verification link.",
        400
      );
    }

    // Verify user
    user.isVerified = true;

    // Remove verification token
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    res.status(200).json({
      message:
        "Email verified successfully. You can now login.",
      success: true,
      status: "success",
    });
  }
);
}

export const userController = new UserController();
