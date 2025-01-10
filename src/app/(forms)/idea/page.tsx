"use client";
import React from "react";
import FormSkeleton from "../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema";
import { FormField } from "@/components/ui/form";
import { FormSelect } from "@/components/form/formSelectItem";
import FormItemWrapper from "@/components/form/formItemWrapper";

export default function Idea() {
  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const tracks = [
    { value: "Open Innovation", label: "Open Innovation" },
    { value: "Other Track Option 1", label: "Other Track Option 1" },
    { value: "Other Track Option 2", label: "Other Track Option 2" },
  ];

  return (
    <div>
      <FormSkeleton
        onSubmit={(data) => {
          console.log(data);
        }}
        form={form}
        buttonText="Submit"
        title="Submit An Idea For Devsoc'25"
      >
        <div className="flex gap-20">
          <div className="flex w-full  flex-col gap-6">
            <FormField
              control={form.control}
              name={"projectName"}
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  labelText={"Project Name"}
                  type={"text"}
                  placeholderText="Project Name"
                  required
                  autoFill
                />
              )}
            />{" "}
            <FormField
              control={form.control}
              name={"projectTrack"}
              render={({ field }) => (
                <FormSelect type="Tracks" {...field} required items={tracks} />
              )}
            />
          </div>
          <div className="flex w-full  flex-col gap-6">
            <FormField
              control={form.control}
              name={"figmaLink"}
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  labelText={"Figma Link"}
                  type={"text"}
                  placeholderText="https://www.figma.com/design/..."
                  required
                  autoFill
                />
              )}
            />
            <FormField
              control={form.control}
              name={"githubLink"}
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  labelText={"Github Link"}
                  type={"text"}
                  placeholderText="https://www.github.com/design/..."
                  required
                  autoFill
                />
              )}
            />
            <FormField
              control={form.control}
              name={"otherLinks"}
              render={({ field }) => (
                <FormItemWrapper
                  field={field}
                  labelText={"Other Links"}
                  type={"text"}
                  placeholderText="https://web.archive.org/web/20210530115917/https://pastebin.com/7nfjLwi3"
                  required
                  autoFill
                />
              )}
            />
          </div>
        </div>
      </FormSkeleton>
    </div>
  );
}
