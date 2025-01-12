//TODO: Move this to (forms) and use the template provided there
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
import { getDefaultsFromSchema } from "../(forms)/defaults";
import { githubLinkSchema } from "../(forms)/schema";

export const hostels: [string, ...string[]] = [
  "Men's Hostel - A Block",
  "Men's Hostel - B Block",
  "Men's Hostel - C Block",
  "Men's Hostel - D Block",
  "Men's Hostel - E Block",
  "Men's Hostel - F Block",
  "Men's Hostel - G Block",
  "Men's Hostel - H Block",
  "Men's Hostel - J Block",
  "Men's Hostel - K Block",
  "Men's Hostel - L Block",
  "Men's Hostel - M Block",
  "Men's Hostel - N Block",
  "Men's Hostel - P Block",
  "Men's Hostel - Q Block",
  "Men's Hostel - R Block",
  "Men's Hostel - S Block",
  "Men's Hostel - T Block",

  "Ladies' Hostel - A Block",
  "Ladies' Hostel - B Block",
  "Ladies' Hostel - C Block",
  "Ladies' Hostel - D Block",
  "Ladies' Hostel - F Block",
];
const userSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: "First name is required field" })
    .default(""), // Default first name
  last_name: z
    .string()
    .min(1, { message: "Last name is required field" })
    .default(""), // Default last name
  room_number: z
    .number()
    .int()
    .min(100, { message: "Must be at least 100" })
    .max(1399, { message: "Must be at most 1399" })
    .default(100), // Default room number
  email: z.string().email("Invalid email format").trim().default(""), // Default email
  vit_email: VITEmailSchema.default(""), // Default VIT email
  phone_no: z
    .string()
    .regex(/^\d{10}$/, "Invalid Phone Number")
    .default(""), // Default phone number
  college: z
    .string()
    .min(1, { message: "College is required field" })
    .default(""), // Default college
  reg_no: z
    .string()
    .regex(/^(?:2[0-5]|19)[a-zA-Z]{3}\d{4}$/, "Invalid Registration no.")
    .default(""), // Default registration number
  gender: z.enum(["M", "F", "O"]).default("M"), // Default gender
  hostel_block: z.enum([...hostels]).default(""), // Default hostel
  github_link: githubLinkSchema, // Default GitHub link is an empty string
});

//change to global gender and block schemas later
const genderItems = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];
export const hostelItems = [
  { value: "Men's Hostel - A Block", label: "Men's Hostel - A Block" },
  { value: "Men's Hostel - B Block", label: "Men's Hostel - B Block" },
  { value: "Men's Hostel - C Block", label: "Men's Hostel - C Block" },
  { value: "Men's Hostel - D Block", label: "Men's Hostel - D Block" },
  { value: "Men's Hostel - E Block", label: "Men's Hostel - E Block" },
  { value: "Men's Hostel - F Block", label: "Men's Hostel - F Block" },
  { value: "Men's Hostel - G Block", label: "Men's Hostel - G Block" },
  { value: "Men's Hostel - H Block", label: "Men's Hostel - H Block" },
  { value: "Men's Hostel - J Block", label: "Men's Hostel - J Block" },
  { value: "Men's Hostel - K Block", label: "Men's Hostel - K Block" },
  { value: "Men's Hostel - L Block", label: "Men's Hostel - L Block" },
  { value: "Men's Hostel - M Block", label: "Men's Hostel - M Block" },
  { value: "Men's Hostel - N Block", label: "Men's Hostel - N Block" },
  { value: "Men's Hostel - P Block", label: "Men's Hostel - P Block" },
  { value: "Men's Hostel - Q Block", label: "Men's Hostel - Q Block" },
  { value: "Men's Hostel - R Block", label: "Men's Hostel - R Block" },
  { value: "Men's Hostel - S Block", label: "Men's Hostel - S Block" },
  { value: "Men's Hostel - T Block", label: "Men's Hostel - T Block" },

  { value: "Ladies' Hostel - A Block", label: "Ladies' Hostel - A Block" },
  { value: "Ladies' Hostel - B Block", label: "Ladies' Hostel - B Block" },
  { value: "Ladies' Hostel - C Block", label: "Ladies' Hostel - C Block" },
  { value: "Ladies' Hostel - D Block", label: "Ladies' Hostel - D Block" },
  { value: "Ladies' Hostel - F Block", label: "Ladies' Hostel - F Block" },
];

export default function Settings() {
  //   const onSubmit = (data) => props.updateAction(data)

  const user = useUserStore((state) => state.user);
  const userFetch = useUserStore((state) => state.fetch);
  const userUpdate = useUserStore((state) => state.updateUser);
  const userIsSet = useUserStore((state) => state.userIsSet);

  React.useEffect(() => {
    if (!userIsSet) {
      try {
        userFetch(); // Fetch user if not loaded
      } catch (e) {
        console.log(e);
        toast.error("Error fetching user details");
      }
    }
    console.log(user);
  }, [user, userFetch, userIsSet]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: getDefaultsFromSchema(userSchema),
  });
  React.useEffect(() => {
    if (userIsSet) {
      // Reset form values after user data is fetched
      form.reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        vit_email: user.vit_email || "",
        room_number: user.room_no || 100, // Ensure you set default value for room_number
        reg_no: user.reg_no || "",
        phone_no: user.phone_no || "",
        gender: user.gender || "M", // Default gender
        hostel_block: user.hostel_block || "", // Default hostel
      });
    }
  }, [user, form, form.reset, userIsSet]);
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
                      placeholderText="VIT Vellore"

                      type={"text"}
                      required
                      autoFill
                    />
                  )}
                />
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
                      placeholderText="639..."
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
                      placeholderText="23..."
                      required
                      autoFill
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name={"vit_email"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"VIT Email Address"}
                      type={"text"}
                      placeholderText="name.lastname202X@vitstudent.ac.in"
                      required
                      autoFill
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={"room_number"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Room Number"}
                      type={"number"}
                      placeholderText="234"
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
                      field={field}
                      required
                      items={hostelItems}
                      type="Block"
                    ></FormSelect>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"github_link"}
                  render={({ field }) => (
                    <FormItemWrapper
                      field={field}
                      labelText={"Github Link"}
                      type={"string"}
                      placeholderText="https://github.com/..."
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
