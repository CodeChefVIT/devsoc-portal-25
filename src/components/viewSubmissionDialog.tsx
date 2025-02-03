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
          <CustomButton icon={<Idea />} disabled={disabled}>
            VIEW SUBMISSION
          </CustomButton>
        </DialogTrigger>
        <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="font-yerk ">View Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-1">
            <div>
              <Label>Title: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.title}
              </p>
            </div>
            <div>
              <Label>Track: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.track}
              </p>
            </div>
            <div>
              <Label>Description: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.description}
              </p>
            </div>
            <div>
              <Label>Github Link: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.github_link}
              </p>
            </div>
            <div>
              <Label>Figma Link: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.figma_link}
              </p>
            </div>
            <div>
              <Label>Other Link: </Label>
              <p className="text-lg  bg-gray-50 border-2 border-black rounded-lg px-4 py-2 text-gray-500">
                {submission.other_link}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
