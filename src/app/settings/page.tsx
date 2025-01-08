"use client";
import { useUserStore } from "@/store/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { IUser } from "@/interfaces";
import { Form, FormField } from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import AuthFormItem from "../(auth)/_components/auth-form-item";
const VITEmailSchema = z
  .string()
  .email("Enter a valid email address")
  .regex(
    /^[a-zA-Z]+\.[a-zA-Z]+202[0-5]@vitstudent\.ac\.in$/,
    "Invalid Email Address"
  );
const userSchema = z.object({
  name: z.string().min(1), // TEXT, non-nullable
  email: VITEmailSchema,
  phone_no: z.string().regex(/^\d{10}$/, "Invalid Phone no."),
  college: z.string().min(1), // TEXT, non-nullable
});
export default function Settings() {
  //   const onSubmit = (data) => props.updateAction(data)

  const user = useUserStore((state) => state.user);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });
  const onSubmit: SubmitHandler<IUser> = (data) => console.log(data);
  const userFetch = useUserStore((state) => state.fetch);
  if (user.id == "") {
    userFetch();
  }
  return (
    <div className="flex flex-col items-center">
      <h1>Settings and profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={"flex w-full flex-col gap-6"}>
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <AuthFormItem
                  field={field}
                  labelText={"Username"}
                  type={"text"}
                  required
                  autoFill
                />
              )}
            />
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <AuthFormItem
                  field={field}
                  labelText={"Email"}
                  type={"text"}
                  required
                  autoFill
                />
              )}
            />
            <FormField
              control={form.control}
              name={"reg_no"}
              render={({ field }) => (
                <AuthFormItem
                  field={field}
                  labelText={"Registration No."}
                  type={"text"}
                  required
                  autoFill
                />
              )}
            />
            <FormField
              control={form.control}
              name={"phone_no"}
              render={({ field }) => (
                <AuthFormItem
                  field={field}
                  labelText={"Phone No."}
                  type={"tel"}
                  required
                  autoFill
                />
              )}
            />
            <CustomButton type="submit">UPDATE</CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
