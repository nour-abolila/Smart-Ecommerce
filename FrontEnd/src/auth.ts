import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { login } from "./lib/api/auth";

type User = {
  id: string;
  email: string;
  password: string;
};

// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks, // keep your `authorized` callback
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Authorize started");

          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

 const response = await login({
  email: credentials.email.toString(),
  password: credentials.password.toString(),
});

console.log("Laravel response:", response);

if (!response?.data?.user) {
  console.log("No user in response");
  return null;
}

return {
  id: response.data.user.id.toString(),
  email: response.data.user.email,
  name: `${response.data.user.first_name} ${response.data.user.last_name}`,
  accessToken: response.data.access_token,
};
        } catch (error) {
          console.error("Authorize failed:", error);
          throw error;
        }
      },
    }),
  ],
});