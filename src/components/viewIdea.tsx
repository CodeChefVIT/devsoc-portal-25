import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import CustomButton from "./CustomButton";
import { Idea } from "@carbon/icons-react";

export default function ViewIdea({disabled}:{disabled: boolean}) {
  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger>
          {" "}
          <CustomButton
            disabled={disabled}
            icon={<Idea />}

          >
            VIEW IDEA
          </CustomButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your idea:</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
