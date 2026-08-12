// lib/api/types.ts

// ---------- Requests ----------

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export interface VerifyOtpRequest {
  user_id: number;
  otp_code: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyPasswordRequest {
  user_id: number;
  email: string;
  otp_code: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  ConfirmPassword: string;
}

// ---------- Responses ----------

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
  };
}

export interface ForgetPasswordResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone_number: number;
      user_created_at: string;
    };
    access_token: string;
    token_type: string;
  };
}

export interface MessageResponse {
  message: string;
}

export interface VerifyPasswordResponse {
  resetToken: string;
}