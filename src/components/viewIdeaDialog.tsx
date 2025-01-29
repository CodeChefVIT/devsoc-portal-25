import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Idea } from "@carbon/icons-react";
import { useIdeaStore } from "@/store/idea";
import { Label } from "./ui/label";
import CustomButton from "./CustomButton";

export default function ViewIdea({ disabled }: { disabled: boolean }) {
  const idea = useIdeaStore((state) => state.idea);
  const ideaFetch = useIdeaStore((state) => state.fetch);
  const checkIdeaExists = useIdeaStore((state) => state.checkSubmissionExists);

  useEffect(() => {
    const fetchIdeaIfNeeded = async () => {
        await ideaFetch(); // Fetch idea if not loaded
    };


    fetchIdeaIfNeeded(); // Call the async function inside the effect
  }, [checkIdeaExists, ideaFetch]);

  return (
    <div>
      <Dialog>
        {/* DialogTrigger asChild */}
        <DialogTrigger asChild>
          <CustomButton disabled={disabled}>
            <Idea />
            VIEW IDEA
          </CustomButton>
        </DialogTrigger>

        <DialogContent className="max-w-max">
          <DialogHeader>
            <DialogTitle className="flex font-monomaniac tracking-wider items-center justify-between">
              {idea.title}
              <span className="inline-block ml-2 h-3 w-3 rounded-full bg-white"></span>
            </DialogTitle>
          </DialogHeader>

          <div>
            <div className="flex items-center gap-4">
              <Label className="font-semibold">Title: </Label>
              <p className="rounded-lg px-3 py-2 text-lg font-semibold">
                {idea.title}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Label className="font-semibold">Track: </Label>
              <p className="border rounded-lg px-3 py-2 text-wrap bg-gray-50">
                {idea.track}
              </p>
            </div>

            <div className="mt-4">
              <Label className="font-semibold">Description: </Label>
              <p className="border break-words rounded-lg px-3 py-2 text-wrap bg-gray-50">
                {idea.description}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
