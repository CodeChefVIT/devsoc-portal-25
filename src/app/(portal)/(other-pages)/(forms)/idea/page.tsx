"use client";
import React from "react";
import FormSkeleton from "../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema";
import ProjectFormFields from "../formFields";
import { createSubmission } from "@/services/submit";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { defaults } from "../defaults";
import { useRouter } from "next/navigation";

export default function Idea() {
  const schema = projectSchema;
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onBlur", // Trigger validation when the input field loses focus
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    let success = false;

    toast.promise(
      async () => {
        createSubmission("idea", data);
        success = true;
      },
      {
        loading: "Loading...",
        success: "Added idea!",
        error: (err: ApiError) => err.message,
      }
    );
    if (success) {
      router.push("/dashboard");
    }
  };
  return (
    <FormSkeleton
      onSubmit={onSubmit}
      form={form}
      buttonText="Submit"
      title="Submit An Idea For Devsoc'25"
    >
      <ProjectFormFields form={form}></ProjectFormFields>
    </FormSkeleton>
  );
}
