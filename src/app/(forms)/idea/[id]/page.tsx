"use client";
import React from "react";
import FormSkeleton from "../../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schema";
import { useParams } from "next/navigation";
import { useIdeaStore } from "@/store/idea";
import { updateSubmission } from "@/services/submit";
import ProjectFormFields from "../../formFields";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";

export default function EditIdea() {
  const { iid } = useParams<{ iid: string }>();

  const idea = useIdeaStore((state) => state.idea);
  const ideaFetch = useIdeaStore((state) => state.fetch);
  const ideaUpdate = useIdeaStore((state) => state.updateIdea);
  React.useEffect(() => {
    if (!idea.id) {
      ideaFetch(iid); // Fetch idea if not loaded
    }
  }, [idea, ideaFetch, iid]);

  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

  });
  React.useEffect(() => {
    if (idea.id) {
      // Reset form values after user data is fetched
      form.reset({
        title: idea.title,
        track: idea.track,
        description: idea.description, //etc etc
        figma_link: idea.figma_link,
        github_link: idea.github_link,
        other_link: idea.other_link,
      });
    }
  }, [idea, form, form.reset]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    //TODO update idea from be
    toast.promise(async () => {
      updateSubmission("submission", "teamID", { ...data, ...idea });
      ideaUpdate({ ...data, ...idea });
    },
    {
      loading: "Loading...",
      success: "Updated submission!",
      error: (err: ApiError) => err.message,
    })
  };


  return (
    <FormSkeleton
      onSubmit={onSubmit}
      form={form}
      buttonText="Submit"
      title="Edit Your idea For Devsoc’25"
    >
      <div className="flex w-full  flex-col gap-6">
      <ProjectFormFields  form={form}></ProjectFormFields>

      </div>
    </FormSkeleton>
  );
}
