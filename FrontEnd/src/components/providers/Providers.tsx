"use client";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "../ui/sonner";
import Footer from "../shared/websiteshared/footer";
import Navbar from "@/components/shared/websiteshared/navbar";
export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: keepPreviousData,
      },
    },
  });

  return (
    <NuqsAdapter>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar/>
          {children }
          <Footer />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </NuqsAdapter>
  );
}
