"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignUp } from "@/zod/auth/mutation";
import { RegisterSchema, RegisterSchemaType } from "@/zod/registeration";
import { SubmitHandler } from "react-hook-form";
const useRegister = () => {
  const router = useRouter();
  const { setEmail, setUserId } = useAuthContext();
  const { mutate, isPending } = useSignUp();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
const onSubmit: SubmitHandler<RegisterSchemaType> = (values) => {
  mutate(
  {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email,
    phone_number: "01063853087",
    password: values.password,
    password_confirmation: values.confirmPassword,
  },
  {
    onSuccess: (response) => {
      console.log("Register response:", response);

      setEmail(values.email);
      setUserId(response.data.user_id);

      toast.success("Account created successfully!");

      form.reset();

      router.push("/register/optregister");
    },

    onError: (error) => {
      toast.error(error.message);
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

export default useRegister;
