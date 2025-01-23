"use client";
import React, { useEffect } from "react";
import FormSkeleton from "../../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schema";
import { updateSubmission } from "@/services/submit";
import ProjectFormFields from "../../formFields";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useIdeaStore } from "@/store/submission";
import { defaults } from "../../defaults";
import { useRouter } from "next/navigation";

export default function EditSubmission() {
  const router = useRouter();
  const submission = useIdeaStore((state) => state.submission);
  const submissionFetch = useIdeaStore((state) => state.fetch);
  const submissionExists = useIdeaStore((state) => state.submissionExists);

  const submissionUpdate = useIdeaStore((state) => state.updateSubmission);
  const checkSubmissionExists = useIdeaStore(
    (state) => state.checkSubmissionExists
  );

  useEffect(() => {
    const fetchIfSubmissionExists = async () => {
      submissionFetch();
    };

    fetchIfSubmissionExists();
  }, [checkSubmissionExists, submissionExists, submissionFetch]);

  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onBlur", // Trigger validation when the input field loses focus
  });
  useEffect(() => {
    const resetIfSubmissionExists = async () => {
      try {
        if (await checkSubmissionExists()) {
          form.reset({
            title: submission.title,
            track: submission.track,
            description: submission.description, // Reset form fields as needed
            figma_link: submission.figma_link,
            github_link: submission.github_link,
            other_link: submission.other_link,
          });
        }
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };

    // Call the async function
    resetIfSubmissionExists();
  }, [submission, form, checkSubmissionExists, form.reset]); // Dependency array

  const onSubmit = (data: z.infer<typeof schema>) => {
    //TODO update idea from be
    let success = false;
    toast.promise(
      async () => {
        updateSubmission("submission", data);
        submissionUpdate(data);
        success = true;
      },
      {
        loading: "Loading...",
        success: "Updated your submission!",
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
      title="Edit Your Project For Devsoc’25"
    >
      <div className="flex w-full  flex-col gap-6">
        <ProjectFormFields form={form}></ProjectFormFields>
      </div>
    </FormSkeleton>
  );
}
