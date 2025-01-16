"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomButton from "../CustomButton";

const CreateTeamDialog: React.FC = () => {
  const [teamCode, setTeamCode] = useState("");

  const handleCreateTeam = () => {
    console.log("Joining team with code:", teamCode);
    // Add your logic here (e.g., API call to join team)
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <CustomButton >
          🛡️ Create Team
        </CustomButton>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="font-yerk mb-4">Create a Team</DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Enter the team Name.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder="Enter team code"
            className="border-2 border-black rounded-lg px-4 py-2"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded justify-center"
              onClick={handleCreateTeam}
            >
              Create
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
