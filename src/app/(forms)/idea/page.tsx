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

export default function Idea() {
  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    toast.promise(createSubmission("idea", { ...data, team_id: "3" }), {
      loading: "Loading...",
      success: "Added idea!",
      error: (err: ApiError) => err.message,
    });
  };
  return (
    <FormSkeleton
      onSubmit={onSubmit}
      form={form}
      buttonText="Submit"
      title="Submit An Idea For Devsoc'25"
    >
      <ProjectFormFields  form={form}></ProjectFormFields>

    </FormSkeleton>
  );
}
