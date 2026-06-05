import { z } from "zod";

export const RegisterDTO = z.object({
  full_name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must not exceed 50 characters")
    .regex(
      /^[A-Za-z\s]+$/,
      "Full name can only contain letters and spaces"
    )
    .trim(),

  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  phone_number: z
    .string()
    .regex(
      /^(98|97)\d{8}$/,
      "Phone number must be a valid Nepal mobile number"
    ),
});


export const LoginDTO = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(5, "Password is required"),
});


