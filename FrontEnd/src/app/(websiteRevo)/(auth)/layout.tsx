import Providers from "@/components/providers/Providers";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ResetPasswordProvider } from "@/components/providers/reset-password-provider";
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 <div className="min-h-full flex flex-col">
      <Providers>
        <AuthProvider>
          <ResetPasswordProvider>
            {children}
          </ResetPasswordProvider>
        </AuthProvider>
      </Providers>
    </div>
  );
}
