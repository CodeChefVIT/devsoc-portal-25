"use client";
import React from "react";
import FormSkeleton from "../../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schema";
import { useParams } from "next/navigation";
import { updateSubmission } from "@/services/submit";
import ProjectFormFields from "../../formFields";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useSubmissionStore } from "@/store/submission";
import { defaults } from "../../defaults";

export default function EditSubmission() {
  const { iid } = useParams<{ iid: string }>();

  const submission = useSubmissionStore((state) => state.submission);
  const submissionFetch = useSubmissionStore((state) => state.fetch);
  const submissionUpdate = useSubmissionStore(
    (state) => state.updateSubmission
  );
  const checkSubmissionExists = useSubmissionStore(
    (state) => state.checkSubmissionExists
  );

  React.useEffect(() => {
    const fetchIfSubmissionExists = async () => {
      if ((await checkSubmissionExists)) submissionFetch(iid); // Fetch idea if not loaded
    };
    
    fetchIfSubmissionExists();
  }, [submission, submissionFetch, , checkSubmissionExists, iid]);

  const schema = projectSchema;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });
  React.useEffect(() => {
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
    toast.promise(
      async () => {
        updateSubmission("idea", "teamID", { ...data, ...submission });
        submissionUpdate({ ...data, ...submission });
      },
      {
        loading: "Loading...",
        success: "Updated asdf!",
        error: (err: ApiError) => err.message,
      }
    );
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
