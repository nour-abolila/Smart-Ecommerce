"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useResetPassword} from "@/zod/auth/mutation"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordContext } from "@/components/providers/reset-password-provider";
// ---------- Zod Schema ----------
const SetNewPasswordSchema = z
  .object({
    password: z
      .string({ error: "Password is required." })
      .min(8, "Use at least 8 characters.")
      .regex(/[a-z]/, "Include a lowercase letter.")
      .regex(/[A-Z]/, "Include an uppercase letter.")
      .regex(/[0-9]/, "Include a number.")
      .regex(/[^A-Za-z0-9]/, "Include a special character (!@#$%)."),
    confirmPassword: z.string({ error: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SetNewPasswordSchemaType = z.infer<typeof SetNewPasswordSchema>;

const PASSWORD_RULES = [
  "Use at least 8 characters",
  "Mix uppercase and lowercase letters",
  "Add numbers and special characters (!@#$)",
  "Avoid using your name or birthdate",
];

// ---------- Hook ----------
const useSetNewPassword = () => {
  const router = useRouter();
  const mutation = useResetPassword()
  const { email } = useResetPasswordContext();
  const form = useForm<SetNewPasswordSchemaType>({
    resolver: zodResolver(SetNewPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

 const onSubmit = (data: SetNewPasswordSchemaType) => {
  mutation.mutate(
    {
      email,
      newPassword: data.password,
      ConfirmPassword: data.confirmPassword,
    },
    {
      onSuccess: () => {
        toast.success("Password updated successfully!");
        form.reset();
        router.push("/resetpassword/sussesmassage");
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    }
  );
};
  return {
    form,
    onSubmit,
    isPending: mutation.isPending,
  };
};

// ---------- Page ----------
const SetNewPasswordPage = () => {
  const { form, onSubmit, isPending } = useSetNewPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/forgetpassword"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Back
      </Link>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="max-w-[420px] w-full">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-1 mb-6">
            <div className="flex items-center gap-2 text-2xl font-semibold mb-5">
              <ShieldCheck size={30} />
              Set new password
            </div>
            <p className="text-muted-foreground max-w-[380px]">
              Your identity has been verified. Create a strong
              <br />
              password for your account.
            </p>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col w-full space-y-4 mt-4 text-left"
            >
              {/* New Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  New Password <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="h-11 rounded-lg bg-[#F8F8F8] pl-10 pr-10"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password <span className="text-[#F97316]">*</span>
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    className="h-11 rounded-lg bg-[#F8F8F8] pl-10 pr-10"
                    {...form.register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
              >
                {isPending ? "Updating..." : "Update Password"}
                {!isPending && <ArrowRight className="!size-4" />}
              </Button>
            </form>

            {/* Rules */}
            <ul className="w-full mt-5 space-y-1.5">
              {PASSWORD_RULES.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <Circle size={5} className="mt-1.5 shrink-0 fill-[#F97316] text-[#F97316]" />
                  {rule}
                </li>
              ))}
            </ul>

            {/* Sign in */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Remember your password?
              <Link
                href="/LoginEmail"
                className="text-[#F97316] font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;