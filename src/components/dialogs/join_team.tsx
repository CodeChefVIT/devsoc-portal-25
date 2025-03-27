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
import { joinTeam } from "@/services/team"; // Import the API function
import { useTeamStore } from "@/store/team";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const JoinTeamDialog = () => {
  const [teamCode, setTeamCode] = useState("");
  const fetchTeam = useTeamStore((state) => state.fetch);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<boolean>(false);

  const handleJoinTeam = async () => {
    setLoading(true);
    return toast.promise(
      async () => {
        await joinTeam(teamCode);
        await fetchTeam();
      },
      {
        loading: "Joining Team...",
        success: "Successfully joined the team!",
        error: (err: ApiError) => err.message,
      }
    ).finally(()=> setLoading(false))
  };

  return (
    <Dialog key={"joinTeam"}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <CustomButton  icon={<FaPlus size={10} /> }>JOIN TEAM</CustomButton>
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
          {/* {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">Successfully joined the team!</div>} */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <CustomButton
 
              onClick={handleJoinTeam}
              disabled={loading || !teamCode.trim()}
            >
              {loading ? "Joining..." : "Join"}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinTeamDialog;
