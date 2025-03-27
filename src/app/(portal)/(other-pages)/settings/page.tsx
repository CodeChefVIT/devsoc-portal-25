"use client";
import { useUserStore } from "@/store/user";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import CustomButton from "@/components/CustomButton";
import toast from "react-hot-toast";
import FormItemWrapper from "../../../../components/form/formItemWrapper";
import { IUser } from "@/interfaces";
import { FormSelect } from "@/components/form/formSelectItemOld";
import { getDefaultsFromSchema } from "../(forms)/defaults";
import { githubLinkSchema } from "../(forms)/schema";
import {
  NameSchema,
  RegNoSchema,
  RoomNumberSchema,
} from "@/app/(auth)/_schemas/general.schema";
import { hostels } from "@/app/(auth)/_schemas/constants";

const userSchema = z.object({
  first_name: NameSchema.default(""),
  last_name: NameSchema.default(""),
  room_no: RoomNumberSchema.default(""),
  hostel_block: z
    .enum(hostels as [string, ...string[]])
    .default("Men's Hostel - K Block"),
  phone_no: z.string().regex(/^\d{10}$/, "Invalid Phone Number").default(""),
  email: z.string().email("Invalid email format").trim().default(""),
  reg_no: RegNoSchema.default(""),
  gender: z.enum(["M", "F", "O"]).default("M"),
  github_profile: githubLinkSchema,
});

const genderItems = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];

const hostelItems = hostels.map((hostel) => ({ value: hostel, label: hostel }));

export default function Settings() {
  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  const userUpdate = useUserStore((state) => state.updateUser);
  const userIsSet = useUserStore((state) => state.userIsSet);

  React.useEffect(() => {
    if (!userIsSet) {
      userFetch(); // Fetch user if not loaded
    }
  }, [user, userFetch, userIsSet]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: getDefaultsFromSchema(userSchema),
  });

  React.useEffect(() => {
    if (userIsSet) {
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        room_no: user.room_no || "",
        reg_no: user.reg_no || "",
        hostel_block: (user.hostel_block as (typeof hostels)[number]) || "",
        phone_no: user.phone_no || "",
        gender: user.gender || "M",
        github_profile: user.github_profile || "",
      });
    }
  }, [user, form, userIsSet]);

  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = (data) => {
    const newUser: IUser = { ...user, ...data };
    return toast.promise(userUpdate(newUser), {
      loading: "Loading...",
      success: "Updated profile!",
      error: () => "",
    });
  };

  return (
    <div className="md:py-2 pt-6 flex flex-col items-center">
      <h1 className={"font-monomaniac text-2xl mb-5"}>Profile</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[90%] md:w-[75%] space-y-8"
        >
          <div className={"flex rounded-lg flex-col gap-4"}>
            <div className="md:flex-row flex-col flex border-4 bg-cc-plain md:p-5 md:pb-16 rounded-lg border-black gap-4 md:gap-20 px-4 py-6">
              <div className="flex w-full flex-col gap-4">
                <FormField
                  control={form.control}
                  name={"first_name"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"First Name"}
                      placeholderText="First Name"
                      type={"text"}
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"last_name"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Last Name"}
                      placeholderText="Last Name"
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
                      placeholderText="xyz@gmail.com"
                      type={"text"}
                      disabled={true}
                      required
                      autoFill
                    />
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-4">
                <FormField
                  control={form.control}
                  name={"gender"}
                  render={({ field }) => (
                    <FormSelect
                      type="Gender"
                      field={field}
                      required
                      items={genderItems}
                      placeholder="Gender"
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
                      placeholderText="23..."
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"hostel_block"}
                  render={({ field }) => (
                    <FormSelect
                      type="Hostel Block"
                      field={field}
                      required
                      items={hostelItems}
                      placeholder="Select Hostel Block"
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
                      placeholderText="639XXXX..."
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"room_no"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Room Number"}
                      type={"text"}
                      placeholderText="A-101"
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"github_profile"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"GitHub Profile"}
                      type={"text"}
                      placeholderText="https://github.com/username"
                      autoFill
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center mb-8 md:mb-0">
              <CustomButton
                type="submit"
                buttonProps={{
                  className: "py-2 text-lg px-10",
                }}
              >
                UPDATE
              </CustomButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}