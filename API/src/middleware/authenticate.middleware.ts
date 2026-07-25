import { type Request, type Response, type NextFunction } from "express";
import { Role } from "../types/globalTypes";
import CustomError from "./Error-handler";
import { decodeJWTToken } from "../utils/jwt.utils";
import { UserModel } from "../app/auth/userModel";

export const authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token
      if (!token) throw new CustomError("Unauthorized, Access Denied", 401)

      const decoded = decodeJWTToken(token)
      if (!decoded) throw new CustomError("Unauthorized", 401)

      // Expiration check
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        res.clearCookie("access_token", { httpOnly: true })
        throw new CustomError("Token Expired. Access Denied", 401)
      }

      // User existence check
      const user = await UserModel.findOne({ email: decoded.email })
      if (!user) throw new CustomError("Unauthorized, User not found", 401)

      // Role check (if provided)
      if (roles?.length && !roles.includes(user.role as Role)) {
        throw new CustomError("Forbidden, Insufficient role", 403)
      }

      // Attach user to request
      (req as any).user = user
      next()
    } catch (error) {
      next(error)
    }
  }
}
