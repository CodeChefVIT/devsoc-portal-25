import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define prop types explicitly
interface RemoveFromTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberIndex: number;
}

const RemoveFromTeamDialog: React.FC<RemoveFromTeamDialogProps> = ({ isOpen, onClose, memberIndex }) => {
  const handleRemove = () => {
    // Logic to remove the member from the team
    console.log(`Removing member at index ${memberIndex}`);
    onClose(); // Close dialog after removal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Team Member</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this member from the team?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded">
            Cancel
          </button>
          <button onClick={handleRemove} className="bg-red-500 text-white py-2 px-4 rounded">
            Remove
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveFromTeamDialog;
