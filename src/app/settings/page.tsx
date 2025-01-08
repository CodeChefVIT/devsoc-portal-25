"use client";
import { useUserStore } from "@/store/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import AuthFormItem from "../(auth)/_components/auth-form-item";
import toast from "react-hot-toast";
const VITEmailSchema = z
  .string()
  .email("Enter a valid email address")
  .regex(
    /^[a-zA-Z]+\.[a-zA-Z]+202[0-5]@vitstudent\.ac\.in$/,
    "Invalid Email Address"
  );
const userSchema = z.object({
  name: z.string().min(1, { message: "Name is not required field" }), // TEXT, non-nullable
  email: VITEmailSchema,
  phone_no: z.string().regex(/^\d{10}$/, "Invalid Phone no."),
  college: z.string().min(1, { message: "College is required field" }), // TEXT, non-nullable
  reg_no: z
    .string()
    .regex(/^(?:2[0-5]|19)[a-zA-Z]{3}\d{4}$/, "Invalid Registration no."),
});
export default function Settings() {
  //   const onSubmit = (data) => props.updateAction(data)

  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  React.useEffect(() => {
    if (!user.id) {
      userFetch(); // Fetch user if not loaded
    }
  }, [user, userFetch]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      reg_no: "",
      college: "",
      phone_no: "",
    },
  });
  React.useEffect(() => {
    if (user.id) {
      // Reset form values after user data is fetched
      form.reset({
        name: user.name || "",
        email: user.email || "",
        college: user.college || "",
        reg_no: user.reg_no || "",
        phone_no: user.phone_no || "",
      });
    }
  }, [user, form, form.reset]);
  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = (data) => {
    toast.success("user button was clicked");
    console.log(data);
  };
  if (!user.id) {
    return <div>{"loading"}</div>;
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className={"font-monomaniac text-2xl mt-2 mb-5"}>
        Settings and profile
      </h1>

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
              name={"college"}
              render={({ field }) => (
                <AuthFormItem
                  field={field}
                  labelText={"College"}
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
