"use client";
import { useUserStore } from "@/store/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import toast from "react-hot-toast";
import FormItemWrapper from "../../components/form/formItemWrapper";
import { IUser } from "@/interfaces";
import { updateUserDetails } from "@/services/user";
import { ApiError } from "next/dist/server/api-utils";
const VITEmailSchema = z
  .string()
  .email("Enter a valid email address")
  .regex(
    /^[a-zA-Z]+\.[a-zA-Z]+202[0-5]@vitstudent\.ac\.in$/,
    "Invalid Email Address"
  );

import { FormSelect } from "../../components/form/formSelectItem";

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is not required field" }), // TEXT, non-nullable
  email: VITEmailSchema,
  phone_no: z.string().regex(/^\d{10}$/, "Invalid Phone Number"),
  college: z.string().min(1, { message: "College is required field" }), // TEXT, non-nullable
  reg_no: z
    .string()
    .regex(/^(?:2[0-5]|19)[a-zA-Z]{3}\d{4}$/, "Invalid Registration no."),
  gender: z.enum([
    "male",
    "female",
    "non-binary",
    "other",
    "prefer-not-to-say",
    "",
  ]),
});

const genderItems = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-Binary" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];
export default function Settings() {
  //   const onSubmit = (data) => props.updateAction(data)

  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  const userUpdate = useUserStore((state) => state.updateUser);

  React.useEffect(() => {
    if (!user.id) {
      userFetch(); // Fetch user if not loaded
    }
    console.log(user);
  }, [user, userFetch]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      reg_no: "",
      college: "",
      phone_no: "",
      gender: "",
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
        gender: user.gender || "",
      });
    }
  }, [user, form, form.reset]);
  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = (data) => {
    const newUser: IUser = {
      ...user,
      ...data,
    };
    toast.promise(updateUserDetails, {
      loading: "Loading...",
      success: "Updated profile!",
      error: (err: ApiError) => err.message,
    });

    userUpdate(newUser);
  };
  if (!user.id) {
    return <div>{"loading"}</div>;
  }
  return (
    <div className="flex flex-col items-center">

      <h1 className={"font-monomaniac  text-2xl mt-2 mb-5"}>
        Settings and profile
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[75%] space-y-8"
        >
          <div className={"flex  rounded-lg flex-col gap-6"}>
            <div className="flex border-4 bg-cc-plain p-10 pb-16 rounded-lg border-black  gap-20">
              <div className="flex w-full  flex-col gap-6">
                <FormField
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItemWrapper
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
                    <FormItemWrapper
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
                    <FormItemWrapper
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
                    <FormItemWrapper
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
                  name={"reg_no"}
                  render={({ field }) => (
                    <FormSelect
                      type="Gender"
                      {...field}
                      required
                      items={genderItems}
                      placeholder="Gender"
                    />
                  )}
                />
              </div>
              <div className="flex  w-full flex-col gap-6">
                <FormField
                  control={form.control}
                  name={"phone_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Phone Number"}
                      type={"tel"}
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"phone_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Phone Number"}
                      type={"tel"}
                      required
                      autoFill
                    />
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name={"phone_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Phone Number"}
                      type={"tel"}
                      required
                      autoFill
                    />
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name={"phone_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Phone Number"}
                      type={"tel"}
                      required
                      autoFill
                    />
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name={"phone_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Phone Number"}
                      type={"tel"}
                      required
                      autoFill
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <CustomButton
                type="submit"
                buttonProps={{
                  className: "py-2 text-lg px-10", // You can control the size of the button here
                }}
              >
                UPDATE
              </CustomButton>
            </div>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
}
