"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { joinTeam } from "@/services/team"; // Import the API function

interface EditTeamDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditTeamDialog: React.FC<EditTeamDialogProps> = ({ isOpen, onClose }) => {
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleJoinTeam = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await joinTeam(teamCode); // Call the API function with the team code
      setSuccess(true); // Set success to true if API call succeeds
      console.log("Successfully joined the team!");
    } catch (err) {
      setError("Failed to join the team. Please check the code and try again.");
      console.error("Error during API call:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Dialog Content */}
      <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="font-yerk mb-4">Edit Team</DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Team Details
          </DialogDescription>
        </DialogHeader>

        {/* First Set of Elements */}
        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-2"
          />

          {/* Display Error or Success Message */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Successfully joined the team!</div>}

          {/* Action Buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              className={`${
                loading ? "bg-gray-400" : "bg-orange-500"
              } text-white py-3 px-8 rounded text-lg`}
              onClick={handleJoinTeam}
              disabled={loading || !teamCode.trim()}
            >
              {loading ? "Editing..." : "Edit"}
            </button>
          </div>
        </div>

        
        <div className="flex flex-col gap-4 mt-6">
          {/* Repeated Title and Description */}
          <DialogTitle className="font-yerk mb-4">Disband Team</DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Team Details
          </DialogDescription>

          {/* Repeated Input Field */}
          <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-2"
          />

          {/* Repeated Display Error or Success Message */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Successfully joined the team!</div>}

          {/* Repeated Action Buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              className={`${
                loading ? "bg-gray-400" : "bg-[#F7F3F0] border-4 border-red-800"
              } text-[#991b1b] py-3 px-8 rounded text-lg`}
              onClick={handleJoinTeam}
              disabled={loading || !teamCode.trim()}
            >
              {loading ? "Disbanding..." : "Disband"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamDialog;
