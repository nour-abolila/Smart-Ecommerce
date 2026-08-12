import { optional, z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string({ error: "Password is required." })
    .min(8, "Password must be at least 8 characters."),

  rememberMe: z.boolean({ error: "Remember me is required." }).default(false).optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
