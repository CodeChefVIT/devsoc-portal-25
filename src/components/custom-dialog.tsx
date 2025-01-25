import React from "react";

import {
  CustomDialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CustomDialog = ({
  open,
  header,
  children,
  setOpen,
}: {
  open: boolean;
  header: string;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CustomDialogContent className="border-4 w-full flex flex-col gap-0 border-black max-w-md">
        <DialogHeader className="w-full p-3 bg-black text-white">
          <DialogTitle className="flex font-monomaniac  tracking-wider items-center justify-between">
            {header}
            <span
              className="inline-block ml-2 h-3 w-3 rounded-full bg-white "
              onClick={() => setOpen(false)}
            ></span>
          </DialogTitle>
        </DialogHeader>
        <div
          className={`px-16 flex gap-5 flex-col bg-cc-plain items-center rounded-b`}
        >
          {children}
        </div>
      </CustomDialogContent>
    </Dialog>
  );
};
export default CustomDialog;
