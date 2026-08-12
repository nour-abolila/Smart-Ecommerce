"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import useRegister from "@/hooks/useRegister";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegistrationForm = () => {
  const { form, onSubmit, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const errors = form.formState.errors;

  return (
    <div className="w-full max-w-[500px] mx-auto py-3 px-4 sm:px-0">
      {/* Social buttons + divider, now their own component */}

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4 w-full">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          or sign up with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
      >
        {/* First / Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name <span className="text-orange-500">*</span>
            </label>
            <Input
              id="firstName"
              type="text"
              placeholder="Mohamed"
              className="bg-[#F8F8F8] p-5"
              {...form.register("firstName")}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name <span className="text-orange-500">*</span>
            </label>
            <Input
              id="lastName"
              type="text"
              className="bg-[#F8F8F8]  p-5"
              placeholder="Hany"
              {...form.register("lastName")}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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
              className="pl-9 bg-[#F8F8F8] py-5"
              {...form.register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            {/* <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /> */}
            {/* <Input
              id="phone"
              type="tel"

              placeholder="+966  -  5X XXX XXXX"
              
              {...form.register("phone")}
            /> */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="sa"
                  value={field.value}
                  onChange={field.onChange}
                  style={{ width: "100%" }}
                  className="phone-input"
                 inputClassName="w-full "
                 inputStyle={
                  {
                    background:"#f8f8f8",
                    height:"40px",
                    borderRadius:"0 10px 10px 0",
                    width:"100%"
                  }
                 }
                 countrySelectorStyleProps={{
                  buttonStyle:{
                    backgroundColor:"#f8f8f8",
                    width:"60px",
                    height:"40px",
                  }
                 }}
                />
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            We'll send a verification code to this number
          </p>
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="pl-9 pr-9 bg-[#F8F8F8] py-5"
              {...form.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="pl-9 pr-9 bg-[#F8F8F8] py-5"
              {...form.register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={form.watch("terms")}
              onCheckedChange={(checked) =>
                form.setValue("terms", checked === true, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-snug"
            >
              I agree to Market's{" "}
              <Link href="/terms" className="text-[#F97316] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#F97316] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-xs text-red-500">{errors.terms.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 rounded-lg p-6 bg-[#F97316] hover:bg-orange-600 font-medium"
        >
          <User className="w-4 h-4 mr-2" />
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      {/* Sign in link */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <Link
          href="/login/email"
          className="text-[#F97316] font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;