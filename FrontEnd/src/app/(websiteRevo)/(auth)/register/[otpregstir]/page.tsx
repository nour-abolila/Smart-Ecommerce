"use client";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/components/providers/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck, ShieldKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Countdown from "@/components/shared/CountdownTimer";
import { useResendOtp, useVerifyOtp } from "@/zod/auth/mutation";

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

  const verifyMutation = useVerifyOtp();
  const resendMutation = useResendOtp();

  const { email, userId } = useAuthContext();

  const form = useForm<VerifyEmailSchemaType>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyEmailSchemaType> = (values) => {
    // Make sure we have the user ID from registration
    if (!userId) {
      toast.error("User information is missing. Please register again.");
      return;
    }

    verifyMutation.mutate(
      {
        user_id: userId,
        otp_code: values.code,
      },
      {
        onSuccess: () => {
          toast.success("Email verified successfully!");

          form.reset();

          router.push("/login/email");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const resend = (email: string) => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("A new code has been sent.");
        },

        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    resend,
    email,
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
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/register"
        className="inline-flex items-center gap-2 text-xl text-muted-foreground hover:text-foreground transition-colors mb-18"
      >
        <ArrowLeft size={32} className="w-4 h-4" />
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

          {/* Resend, now using the Countdown component */}
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
              href="/register"
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