import type { NextAuthConfig } from "next-auth";
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login/email",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAccountArea =
        nextUrl.pathname.startsWith("/account") ||
        nextUrl.pathname.startsWith("/checkout") ||
        nextUrl.pathname.startsWith("/orders");
      const isProtected = isOnDashboard || isOnAccountArea;
      if (isProtected){
        return isLoggedIn;
      }
      return true;
    },
  },
  providers:[],
};
