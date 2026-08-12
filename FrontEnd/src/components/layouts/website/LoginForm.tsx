"use client";

import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from 'react';
import useLogin from "@/hooks/useLogin";

const LoginPage = () => {
  const { form, onSubmit, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const errors = form.formState.errors;

  return (
    <div className="w-full max-w-[550px] mx-auto px-6 pt-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-1 mb-6">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your Rivo account
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-9 py-5 mt-2 bg-[#F8F8F8]"
              {...form.register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
             <div className="space-y-1.5 ">
          <label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="pl-9 pr-9 bg-[#F8F8F8] py-5 my-1"
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me / forgot password */}
        <div className="flex items-center justify-between mt-7">
          <div className="flex items-center gap-2">
            <Checkbox
              className="w-[22px] h-[22px]"
              id="remember"
              checked={form.watch("rememberMe")}
              onCheckedChange={(checked) =>
                form.setValue("rememberMe", checked === true)
              }
            />
            <label htmlFor="remember" className="text-muted-foreground">
              Remember me
            </label>
          </div>

          <Link
            href="/forgetpassword"
            className="text-sm text-[#F97316] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
        >
          <LogIn className="w-4 h-4 ml-2" />
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-7 w-full">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
};

export default LoginPage;
