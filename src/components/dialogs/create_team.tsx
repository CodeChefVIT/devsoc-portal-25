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
import { createTeam } from "@/services/team"; // Import the create team API

const CreateTeamDialog: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);


  const handleCreateTeam = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createTeam(teamName); // Call API with team name
      setSuccess(true); // If successful, set success state
      console.log("Team created successfully:", response);
    } catch (err) {
      setError("Failed to create the team. Please try again.");
      console.error("Error during API call:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <CustomButton>🛡️ Create Team</CustomButton>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="font-yerk mb-4">Create a Team</DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Enter the team name to create your team.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Input Field for Team Name */}
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            className="border-2 border-black rounded-lg px-4 py-2"
          />

          {/* Display Error or Success Message */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Team created successfully!</div>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className={`${
                loading ? "bg-gray-400" : "bg-orange-500"
              } text-white py-2 px-4 rounded`}
              onClick={handleCreateTeam}
              disabled={loading || !teamName.trim()}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
