import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/globalTypes";

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const generateJWTToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
};

export const decodeJWTToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
