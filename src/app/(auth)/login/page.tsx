"use client";

import React from "react";
import Modal from "@/app/(auth)/_components/modal";
import Link from "@/app/(auth)/_components/custom-link";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormType, LoginSchema } from "@/app/(auth)/_schemas/forms.schema";

import { Form, FormField } from "@/components/ui/form";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import { login, resendOTP } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";

const Login = () => {
  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleResetPassword = async () => {
    return toast.promise(
      async () => {
        const { email } = form.getValues();
        const isPersonalDetailsFilled = await form.trigger(["email"]);
        if (!isPersonalDetailsFilled) {
          throw new Error("Please fill the email!");
        }
        await resendOTP({
          email: email,
        });
        router.push(`/reset-password/${email}`);
      },
      {
        loading: "Loading...",
        success: "Verify OTP to continue!",
        error: (err: ApiError) => err.message,
      }
    );
  };

  const onSubmit = async (values: LoginFormType) => {
    return toast.promise(
      async () => {
        const res = await login({
          email: values.email,
          password: values.password,
        });
        
        if (res.is_profile_complete) {
          router.push(`/dashboard`);
        } else {
          router.push(`/fill-details/1`);
        }
      },
      {
        loading: "Loading...",
        success: "Logged in successfully",
        error: (err: ApiError) => err.message,
      }
    );
  };

  return (
    <div className={"w-full flex justify-center items-center"}>
      <Modal classname={""} text={"Welcome back!"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={"w-full flex flex-col items-center gap-10"}
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
                  <div className={"relative w-full"}>
                    <AuthFormItem
                      field={field}
                      labelText={"Password"}
                      type={"password"}
                      required
                      autoFill
                    />
                    {/* <Link
                      text={"Recover Password"}
                      onClick={handleResetPassword}
                      className={"mt-1 absolute right-0 text-xs"}
                    /> */}
                  </div>
                )}
              />
            </div>
            <div className={"flex flex-col justify-center items-center gap-4"}>
              <div className={"text-sm mt-2 font-inter"}>
                Don't have an account?{" "}
                <Link text={"Sign Up"} href={"/sign-up"} />
              </div>
              <Button
                variant={"primary"}
                size={"primary"}
                type={"submit"}
                disabled={form.formState.isSubmitting}
                className="bg-[#FF6D33] hover:cursor-pointer"
              >
                <p className="mb-[3px]">
                  {form.formState.isSubmitting ? "Logging in..." : "Login"}
                </p>
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;