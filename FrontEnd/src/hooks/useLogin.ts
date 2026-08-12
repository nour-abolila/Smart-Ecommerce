"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginSchema, LoginSchemaType } from "@/zod/login";
import { useSignIn } from "@/zod/auth/mutation";
import { SubmitHandler } from "react-hook-form";
const useLogin = () => {
  const router = useRouter();
  const { mutate, isPending } = useSignIn();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false || undefined,
    },
  });

const onSubmit: SubmitHandler<LoginSchemaType> = (values) => {
  mutate(
    {
      email: values.email,
      password: values.password,
    },
    {
      onSuccess: () => {
        form.reset();
        router.push("/home");

        setTimeout(() => {
          toast.success("Logged in successfully");
        }, 200);
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    }
  );
};


  return {
    form,
    onSubmit,
    isPending,
  };
};
export default useLogin;
