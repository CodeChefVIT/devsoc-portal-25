"use client";
import React from "react";
import FormSkeleton from "../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema";
import { createSubmission } from "@/services/submit";
import ProjectFormFields from "../formFields";

export default function Idea() {
  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      track: "Open Innovation",
      description: "", //etc etc
      figma_link: "",
      github_link: "",
      other_link: "",
    },
  });


  const onSubmit = (data: z.infer<typeof schema>) => {
    createSubmission("submission", {...data, team_id: "3"});
    console.log(data);
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
