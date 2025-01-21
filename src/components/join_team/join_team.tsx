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
import { jointeam } from "@/services/join"; // Import the API function

const JoinTeamDialog: React.FC = () => {
  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleJoinTeam = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await jointeam(teamCode); // Call the API function with the team code
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
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <CustomButton>🛡️ Join Team</CustomButton>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="font-yerk mb-4">Join a Team</DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Enter the team code to join the team.
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

          {/* Display Error or Success Message */}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Successfully joined the team!</div>}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className={`${
                loading ? "bg-gray-400" : "bg-orange-500"
              } text-white py-2 px-4 rounded`}
              onClick={handleJoinTeam}
              disabled={loading || !teamCode.trim()}
            >
              {loading ? "Joining..." : "Join"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeamDialog;
