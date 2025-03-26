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
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { useTeamStore } from "@/store/team";
import { LiaHandshake } from "react-icons/lia";

const CreateTeamDialog = () => {
  const [teamName, setTeamName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const fetchTeam = useTeamStore((state) => state.fetch);
  const handleCreateTeam = async () => {
    setLoading(true);
    return toast
      .promise(
        async () => {
          await createTeam(teamName);
          await fetchTeam();
        },
        {
          loading: "Loading...",
          success: "Created team!",
          error: (err: ApiError) => err.message,
        }
      )
      .finally(() => {
        setIsDialogOpen(false);
        setLoading(false);
      }); // Fetch the team data after creating the team
    // Fetch the team data after creating the team
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <CustomButton
          icon={<LiaHandshake size={70} />}
          onClick={() => setIsDialogOpen(true)}
          
        >
          CREATE TEAM
        </CustomButton>
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <CustomButton
              
              onClick={handleCreateTeam}
            >
              {loading ? "Creating..." : "Create"}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
