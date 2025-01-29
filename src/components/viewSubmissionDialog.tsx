import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Idea } from "@carbon/icons-react";
import { Label } from "./ui/label";
import { useSubmissionStore } from "@/store/submission";
import CustomButton from "./CustomButton";

export default function ViewSubmission({ disabled }: { disabled: boolean }) {
  const submission = useSubmissionStore((state) => state.submission);
  const submissionFetch = useSubmissionStore((state) => state.fetch);
  const submissionExists = useSubmissionStore(
    (state) => state.submissionExists
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

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <CustomButton disabled={disabled}>
            <Idea />
            VIEW SUBMISSION
          </CustomButton>
        </DialogTrigger>
        <DialogContent className="max-w-max mx-auto">
          <DialogHeader>
            <DialogTitle className="flex font-monomaniac tracking-wider items-center justify-between">
              Your project
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Label className="font-semibold">Title: </Label>
              <p className="rounded-lg px-3 py-2 text-lg font-semibold bg-gray-50">
                {submission.title}
              </p>
            </div>
            <div>
              <Label>Track: </Label>
              <p className="border rounded-lg px-3 py-2 break-words bg-gray-50">
                {submission.track}
              </p>
            </div>
            <div>
              <Label>Description: </Label>
              <p className="border rounded-lg px-3 py-2 break-words bg-gray-50">
                {submission.description}
              </p>
            </div>
            <div>
              <Label>Github Link: </Label>
              <p className="border rounded-lg px-3 py-2 break-words bg-gray-50">
                {submission.github_link}
              </p>
            </div>
            <div>
              <Label>Figma Link: </Label>
              <p className="border rounded-lg px-3 py-2 break-words bg-gray-50">
                {submission.figma_link}
              </p>
            </div>
            <div>
              <Label>Other Link: </Label>
              <p className="border rounded-lg px-3 py-2 break-words bg-gray-50">
                {submission.other_link}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
