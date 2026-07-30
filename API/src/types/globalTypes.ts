import { Types } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const onlyAdmin = [Role.ADMIN];
export const onlyUser = [Role.USER];
export const onlyAdminAndUser = [Role.ADMIN, Role.USER];

export interface JWTPayload {
  _id: Types.ObjectId;
  role: Role;
  email: string;
  first_name: string;
  last_name: string;

  iat?: number; // issued at (seconds since epoch)
  exp?: number; // expiration (seconds since epoch)
}
