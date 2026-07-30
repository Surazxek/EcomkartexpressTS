import { z } from "zod";

export const RegisterDTO = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must not exceed 30 characters")
    .regex(/^[A-Za-z]+$/, "First name can only contain letters"),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must not exceed 30 characters")
    .regex(/^[A-Za-z]+$/, "Last name can only contain letters"),

  email: z.string().email("Invalid email address").toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  phone_number: z
    .string()
    .regex(
      /^(?:\+977|00977)?\s?(98\d{8}|97\d{8})$/,
      "Phone number must be a valid Nepali mobile number",
    )
    .optional(),
});

export const LoginDTO = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),

  password: z.string().min(5, "Password is required"),
});
