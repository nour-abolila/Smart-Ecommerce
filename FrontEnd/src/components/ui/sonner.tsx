"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
import { CheckCircle2, XCircle, Loader2, Info, AlertTriangle } from "lucide-react";

// -----------------------------------------------------------------------
// This wraps sonner's <Toaster /> with `unstyled: true`, which strips
// sonner's default box/colors entirely and lets us hand every part
// (toast, title, description, icon...) its own Tailwind classes below.
// You still call toast.success(...) / toast.error(...) / toast.loading(...)
// exactly like before — only the visuals change.
// -----------------------------------------------------------------------

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      richColors={false}
      icons={{
        success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        loading: <Loader2 className="h-5 w-5 animate-spin text-orange-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
        warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-3 w-full rounded-2xl border px-4 py-3.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 bg-white/10 border-white/20",
          title: "text-sm font-medium",
          description: "text-xs opacity-80",
          icon: "shrink-0",
          closeButton:
            "!bg-transparent !border-none opacity-60 hover:opacity-100",
          actionButton:
            "!bg-black !text-white !rounded-lg !px-3 !py-1.5 !text-xs !font-medium",
          cancelButton:
            "!bg-transparent !text-muted-foreground !text-xs",

          success:
            "!bg-emerald-500/10 !border-emerald-500/30 !text-emerald-700 shadow-emerald-500/20",
          error:
            "!bg-red-500/10 !border-red-500/30 !text-red-700 shadow-red-500/20",
          loading:
            "!bg-orange-500/10 !border-orange-500/30 !text-orange-700 shadow-orange-500/20",
          info:
            "!bg-blue-500/10 !border-blue-500/30 !text-blue-700 shadow-blue-500/20",
          warning:
            "!bg-amber-500/10 !border-amber-500/30 !text-amber-700 shadow-amber-500/20",
          default:
            "!bg-white/10 !border-white/20 !text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };