import React from "react";
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
import { Button } from "@/components/ui/button";
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
    toast.promise(removeMember(email), {
      loading: "Removing member...",
      success: "Member removed successfully",
      error: (err: ApiError) => err.message,
    });  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-red-500"
          onClick={() => handleRemove(email)} // or handle remove member
        >
          ⛔
        </Button>{" "}
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
            onClick={() => {handleRemove(email)}}
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
