"use client";
import React, { useEffect } from "react";
import FormSkeleton from "../../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schema";
import { useIdeaStore } from "@/store/idea";
import { updateSubmission } from "@/services/submit";
import ProjectFormFields from "../../formFields";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { defaults } from "../../defaults";
import { useRouter } from "next/navigation";

export default function EditIdea() {
  const router = useRouter()
  const idea = useIdeaStore((state) => state.idea);
  const ideaFetch = useIdeaStore((state) => state.fetch);
  const ideaUpdate = useIdeaStore((state) => state.updateSubmission);
  const checkIdeaExists = useIdeaStore((state) => state.checkSubmissionExists);

  useEffect(() => {
    const fetchIdeaIfNeeded = async () => {
        ideaFetch(); // Fetch idea if not loaded
    };

    fetchIdeaIfNeeded(); // Call the async function inside the effect
  }, [checkIdeaExists, ideaFetch]);

  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onBlur",  // Trigger validation when the input field loses focus

  });
  React.useEffect(() => {
    const resetFormIfIdeaExists = async () => {
      if (await checkIdeaExists()) {
        // Reset form values after user data is fetched
        form.reset({
          title: idea.title,
          track: idea.track,
          description: idea.description,
          figma_link: idea.figma_link,
          github_link: idea.github_link,
          other_link: idea.other_link,
        });
      }
    };

    resetFormIfIdeaExists();
  }, [idea, form, checkIdeaExists, form.reset]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    //TODO update idea from be
    let success = false
    toast.promise(
      async () => {
        updateSubmission("idea", data);
        ideaUpdate(data);
        success = true
      },
      {
        loading: "Loading...",
        success: "Updated idea!",
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
      title="Edit Your idea For Devsoc’25"
    >
      <div className="flex w-full  flex-col gap-6">
        <ProjectFormFields form={form}></ProjectFormFields>
      </div>
    </FormSkeleton>
  );
}
