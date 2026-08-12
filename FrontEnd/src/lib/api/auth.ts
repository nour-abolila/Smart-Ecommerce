import { api } from "./clients";

import type {
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  ResendOtpRequest,
  LoginRequest,
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  VerifyPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  MessageResponse,
  VerifyPasswordResponse,
} from "./types";

export const register = (data: RegisterRequest) =>
  api<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyOtp = (data: VerifyOtpRequest) =>
  api<MessageResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resendOtp = (data: ResendOtpRequest) =>
  api<MessageResponse>("/api/auth/resend-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: LoginRequest) =>
  api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const forgetPassword = (data: ForgetPasswordRequest) =>
  api<ForgetPasswordResponse>("/api/auth/forget-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const verifyPassword = (data: VerifyPasswordRequest) =>
  api<VerifyPasswordResponse>("/api/auth/verify-password", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const resetPassword = (data: ResetPasswordRequest) =>
  api<MessageResponse>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });