"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  email: string;
  userId: number | null;
  setEmail: (email: string) => void;
  setUserId: (userId: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <AuthContext.Provider
      value={{
        email,
        userId,
        setEmail,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}