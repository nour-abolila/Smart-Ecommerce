
// hooks/use-auth.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/api/auth";
import type { LoginRequest } from "@/lib/api/types";

export const useSignUp = () => useMutation({ mutationFn: authApi.register });
export const useVerifyOtp = () =>
  useMutation({ mutationFn: authApi.verifyOtp });
export const useResendOtp = () =>
  useMutation({ mutationFn: authApi.resendOtp });
export const useForgetPassword = () =>
  useMutation({ mutationFn: authApi.forgetPassword });
export const useVerifyPassword = () =>
  useMutation({ mutationFn: authApi.verifyPassword });
export const useResetPassword = () =>
  useMutation({ mutationFn: authApi.resetPassword });

// Raw NextAuth sign-in mutation — no form logic, just the network call.
export const useSignIn = () =>
  useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error) throw new Error("Invalid email or password");
      return res;
    },
  });

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => {
      router.push("/login/email");
      router.refresh();
    },
  });
};
