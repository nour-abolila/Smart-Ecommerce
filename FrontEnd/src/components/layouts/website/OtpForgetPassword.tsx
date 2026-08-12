"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldCheck, ShieldKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Countdown from "@/components/shared/CountdownTimer";
import {
  useResendOtp,
  useVerifyPassword,
} from "@/zod/auth/mutation";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useResetPasswordContext } from "@/components/providers/reset-password-provider";

// ---------- Zod Schema ----------
const VerifyEmailSchema = z.object({
  code: z
    .string({ error: "Code is required." })
    .length(6, "Enter the full 6-digit code."),
});

type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema>;

// ---------- Hook ----------
const useVerifyEmail = () => {
  const router = useRouter();

  const verifyMutation = useVerifyPassword();
  const resendMutation = useResendOtp();

  // User ID comes from the forgot-password response
  const { userId } = useAuthContext();

  // Email comes from ResetPasswordContext
  const { email } = useResetPasswordContext();

  const form = useForm<VerifyEmailSchemaType>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyEmailSchemaType> = (values) => {
    // Make sure we have the user ID
    if (userId === null) {
      toast.error(
        "User information is missing. Please request a new code.",
      );
      return;
    }

    // Make sure we have the email
    if (!email) {
      toast.error(
        "Email information is missing. Please request a new code.",
      );
      return;
    }

    verifyMutation.mutate(
      {
        user_id: userId,
        email: email,
        otp_code: values.code,
      },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");

          form.reset();

          router.push("/resetpassword");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const resend = (email: string) => {
    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("A new code has been sent.");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    email,
    resend,
    isPending: verifyMutation.isPending,
    isResending: resendMutation.isPending,
  };
};

// ---------- Page ----------
const VerifyEmailPage = () => {
  const {
    form,
    onSubmit,
    email,
    isPending,
    resend,
    isResending,
  } = useVerifyEmail();

  return (
    <div>
      {/* Back link */}
      <Link href="/forgetpassword">
        Back
      </Link>

      {/* Header */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[450px]">
          <div className="flex flex-col items-center text-center gap-1 mb-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <ShieldKeyhole className="w-6 h-6" />
              Verify your email
            </div>

            <p className="text-muted-foreground mt-1">
              We've sent a 6-digit code to your email
            </p>

            <p className="font-medium">
              {email}
            </p>

            <p className="text-muted-foreground mt-1">
              Enter it below to activate your account.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* OTP input */}
            <InputOTP
              className=""
              maxLength={6}
              value={form.watch("code")}
              onChange={(value) =>
                form.setValue("code", value, {
                  shouldValidate: true,
                })
              }
            >
              <InputOTPGroup className="gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-11 h-14 my-3 mx-1.5 text-[#F97316] bg-[#F8F8F8] rounded-lg border text-lg"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {form.formState.errors.code && (
              <p className="text-xs text-red-500">
                {form.formState.errors.code.message}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
            >
              <ShieldCheck className="!size-4" />
              {isPending ? "Verifying..." : "Verify Code "}
            </Button>
          </form>

          {/* Resend */}
          <div className="mt-5">
            <Countdown
              seconds={60}
              onResend={() => resend(email)}
              isResending={isResending}
            />
          </div>

          {/* Change email */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Wrong email?{" "}
            <Link
              href="/forgetpassword"
              className="text-[#F97316] font-medium hover:underline"
            >
              Change it
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;