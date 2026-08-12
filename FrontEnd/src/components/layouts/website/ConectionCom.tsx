"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address")
    .email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const NewsletterSignup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterFormValues) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Subscription failed");
      }

      toast.success("You're subscribed! Check your inbox for a welcome email.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black px-6 py-12 sm:px-12 mt-7">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-orange-900/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-orange-900/10 blur-2xl" />

      <div className="relative mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold text-[#F97316]">Stay in the loop</p>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Get Exclusive Deals First
        </h2>

        <p className="mt-3 text-sm text-gray-400">
          Subscribe and be the first to know about flash sales, new arrivals,
          and members-only offers.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-start"
        >
          <div className="flex-1 text-left">
            <input
              type="email"
              placeholder="Your email address"
              disabled={isSubmitting}
              {...register("email")}
              className="w-80% rounded-lg border border-gray-700 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F97316] disabled:opacity-60"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#F97316] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
};

export default NewsletterSignup;