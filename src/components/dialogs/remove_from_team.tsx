import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useTeamStore } from "@/store/team";
import { ApiError } from "next/dist/server/api-utils";
// Define prop types explicitly
interface RemoveFromTeamDialogProps {
  email: string;
}

const RemoveFromTeamDialog: React.FC<RemoveFromTeamDialogProps> = ({
  email,
}) => {
  const removeMember = useTeamStore((state) => state.removeMember);

  const handleRemove = (email: string) => {
    return toast.promise(removeMember(email), {
      loading: "Removing member...",
      success: "Member removed successfully",
      error: (err: ApiError) => err.message,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <IoMdRemoveCircleOutline className="text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this member from the team?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel className="bg-gray-400 text-white py-2 px-4 rounded">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleRemove(email);
            }}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFromTeamDialog;
