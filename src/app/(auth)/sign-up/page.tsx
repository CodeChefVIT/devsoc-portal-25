"use client";

import React from "react";
import Modal from "@/app/(auth)/_components/modal";
import { Form, FormField } from "@/components/ui/form";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Link from "@/app/(auth)/_components/custom-link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  SignupFormType,
  SignupSchema,
} from "@/app/(auth)/_schemas/forms.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signup } from "@/services/auth";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";

const SignUp = () => {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    defaultValues: {
      confirmPassword: "",
      password: "",
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: SignupFormType) => {
    return toast.promise(
      async () => {
        await signup({
          email: values.email,
          password: values.password,
        });
        router.push(
          `/sign-up/verify-otp?email=${encodeURIComponent(values.email)}`
        );
      },
      {
        loading: "Loading...",
        success: "Verify OTP to continue!",
        error: (err: ApiError) => err.message,
      }
    );
  };

  return (
    <div className={"w-full flex justify-center items-center"}>
      <Modal classname={"py-10"} text={"Welcome back!"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"w-full max-w-xs flex flex-col items-center gap-4"}
          >
            <div className={"flex w-full flex-col gap-4"}>
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <AuthFormItem
                    field={field}
                    labelText={"VIT Email"}
                    type={"text"}
                    required
                    autoFill
                  />
                )}
              />
              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <AuthFormItem
                    field={field}
                    labelText={"Password"}
                    type={"password"}
                    required
                    autoFill
                  />
                )}
              />
              <FormField
                control={form.control}
                name={"confirmPassword"}
                render={({ field }) => (
                  <AuthFormItem
                    field={field}
                    labelText={"Confirm Password"}
                    type={"password"}
                    required
                    autoFill
                  />
                )}
              />
            </div>
            <div className={"flex flex-col justify-center items-center gap-4"}>
              <div className={"text-sm mt-2 font-inter"}>
                Already have an account?{" "}
                <Link text={"Log in"} href={"/login"} />
              </div>
              <Button variant={"primary"} size={"primary"} type={"submit"}>
                <p className="mb-[3px]">Create Account</p>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};
export default SignUp;
