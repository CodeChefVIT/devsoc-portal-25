"use client"
import AuthFormItem from "@/components/auth-form-item-v1";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResetPasswordSchema } from "../../_schemas/forms.schema";
import Modal from "../../_components/modal";
import { Button } from "@/components/ui/button";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { updatePassword } from "@/services/auth";

export default function ResetPassword() {
  const {email} = useParams<{ email: string }>();

  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
      otp: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    toast.promise(
      async () => {
        await updatePassword({
          email: decodeURIComponent(email),
          new_password: values.password,
          otp: values.otp,
        });
        router.push(
          `/login`
        );
      },
      {
        loading: "Loading...",
        success: "Password reset sucessfully!",
        error: (err: ApiError) => err.message,
      }
    );
  };
  return (
    <div>
      {" "}
      <div className={"w-full flex justify-center items-center py-5 "}>
        <Modal classname={"py-10"} text={"Welcome back!"}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"w-full max-w-xs flex flex-col items-center gap-4"}
            >
              <div className={"flex w-full flex-col gap-4"}>
                <FormField
                  control={form.control}
                  name={"otp"}
                  render={({ field }) => (
                    <AuthFormItem
                      field={field}
                      labelText={"Enter OTP"}
                      type={"text"}
                      required
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
              <div
                className={"flex flex-col justify-center items-center gap-4"}
              >
                <Button variant={"primary"} size={"primary"} type={"submit"}>
                  <p className="mb-[3px]">Update Password</p>
                </Button>
              </div>
            </form>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
