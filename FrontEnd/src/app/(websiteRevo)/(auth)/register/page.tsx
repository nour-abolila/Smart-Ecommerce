import React from "react";
import RegistrationForm from "@/components/layouts/website/registerationForm";
import SocialLoginButtons from "@/components/layouts/website/SocialLogin";
import { User } from "lucide-react";
const Register = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1 mb-6">
          <div className="flex items-center gap-2 text-xl font-bold">
            <User className="w-5 h-5" />
            Create Account
          </div>
          <p className="text-sm text-muted-foreground">
            Join Rivo and start shopping today!
          </p>
        </div>
        <SocialLoginButtons />
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;
