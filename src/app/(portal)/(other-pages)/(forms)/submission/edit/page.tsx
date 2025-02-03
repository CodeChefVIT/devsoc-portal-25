"use client";
import React, { useEffect, useState } from "react";
import FormSkeleton from "../../formSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../schema";
import { updateSubmission } from "@/services/submit";
import ProjectFormFields from "../../formFields";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useSubmissionStore } from "@/store/submission";
import { defaults } from "../../defaults";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function EditSubmission() {
  const router = useRouter();
  const [submissionSet, setSubmissionSet] = useState(false);
  const submission = useSubmissionStore((state) => state.submission);
  const submissionFetch = useSubmissionStore((state) => state.fetch);
  const submissionExists = useSubmissionStore(
    (state) => state.submissionExists
  );

  const submissionUpdate = useSubmissionStore(
    (state) => state.updateSubmission
  );
  const checkSubmissionExists = useSubmissionStore(
    (state) => state.checkSubmissionExists
  );

  useEffect(() => {
    const fetchIfSubmissionExists = async () => {
      await submissionFetch();
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
          setSubmissionSet(true);
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
    return toast.promise(
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

  if (!submissionSet) {
    return (
      <div className="flex h-[calc(100vh-60px)] justify-center items-center ">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    );
  }

  return (
    <FormSkeleton
      onSubmit={onSubmit}
      form={form}
      buttonText="Submit"
      title="Edit Your Project For Devsoc’25"
    >
      <div className="flex w-full  flex-col gap-4">
        <ProjectFormFields form={form}></ProjectFormFields>
      </div>
    </FormSkeleton>
  );
}
