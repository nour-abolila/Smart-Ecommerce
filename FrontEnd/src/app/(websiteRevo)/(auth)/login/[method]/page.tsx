import LoginPage from "@/components/layouts/website/LoginForm";
import React from 'react'
import Link from "next/link";
import SocialLoginButtons from "@/components/layouts/website/SocialLogin";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoginPage/>
      <SocialLoginButtons/>
        <p className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account? 
        <Link href="/register" className="text-[#F97316] font-medium hover:underline">
          Create account
        </Link>
      </p>
    </div>
  )
}

export default Login
