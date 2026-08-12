import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
export const RegisterSchema = z
  .object({
    firstName: z
      .string({ error: "First name is required." })
      .trim()
      .min(1, "First name is required.")
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name is too long."),

    lastName: z
      .string({ error: "Last name is required." })
      .trim()
      .min(1, "Last name is required.")
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name is too long."),

    email: z
      .string({ error: "Email is required." })
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    phone: z
      .string()
      .min(1, "Phone number is required.")
      .refine(isValidPhoneNumber, {
        message: "Please enter a valid phone number.",
      }),

    password: z
      .string({ error: "Password is required." })
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character.",
      ),

    confirmPassword: z
      .string({ error: "Please confirm your password." })
      .min(1, "Please confirm your password."),

    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the Terms of Service and Privacy Policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
