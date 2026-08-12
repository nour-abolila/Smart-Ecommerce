"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/shared/CountdownTimer";

// ---------- Page ----------
const PasswordUpdatedSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8">
      {/* Back link */}
      <Link
        href="/resetpassword"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Back
      </Link>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="max-w-[420px] w-full flex flex-col items-center text-center gap-1">
          {/* Success icon */}
          <div className="flex items-center justify-center size-16 rounded-full bg-green-50 mb-5">
            <div className="flex items-center justify-center size-11 rounded-full border-2 border-green-500">
              <Check size={22} className="text-green-500" strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-2xl font-semibold">Password Updated Successfully</h1>
          <p className="text-muted-foreground max-w-[380px] mt-1">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3 mt-6">
            <Button
             
              className="w-full h-11 rounded-lg bg-[#F97316] hover:bg-orange-600 font-medium"
            >
              <Link href="/home">
                Back to Home
                <ArrowRight className="!size-4 inline m-2" />
              </Link>
            </Button>

            <Button
        
              variant="outline"
              className="w-full h-11 rounded-lg border-[#F97316] text-[#F97316] hover:bg-orange-50 hover:text-[#F97316] font-medium"
            >
              <Link href="/login/email">
                Sign In to your account
                <ArrowRight className="!size-4 inline m-2 " />
              </Link>
            </Button>
          </div>

          <div className="mt-4">
            <Countdown
              seconds={4}
              label=""
              onComplete={() => router.push("/login/email")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdatedSuccessPage;