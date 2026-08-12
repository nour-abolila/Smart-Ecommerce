"use client";

import { createContext, useContext, useState } from "react";

interface ResetPasswordContextType {
  email: string;
  setEmail: (email: string) => void;
}

const ResetPasswordContext = createContext<ResetPasswordContextType | null>(
  null,
);

export function ResetPasswordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");

  return (
    <ResetPasswordContext.Provider value={{ email, setEmail }}>
      {children}
    </ResetPasswordContext.Provider>
  );
}

export function useResetPasswordContext() {
  const context = useContext(ResetPasswordContext);

  if (!context) {
    throw new Error(
      "useResetPasswordContext must be used inside ResetPasswordProvider",
    );
  }

  return context;
}
