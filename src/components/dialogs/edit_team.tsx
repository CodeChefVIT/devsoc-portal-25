"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteTeam, updateTeamName } from "@/services/team";
import LabelledInput from "../labelled-input";
import { ApiError } from "next/dist/server/api-utils";
import { useTeamStore } from "@/store/team";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PenBoxIcon } from "lucide-react";
import CustomButton from "../CustomButton";
import { useIdeaStore } from "@/store/idea";
import { useSubmissionStore } from "@/store/submission";
import { useUserStore } from "@/store/user";

const EditTeamDialog: React.FC = () => {
  const teamName = useTeamStore((state) => state.team.team_name);
  const [inputTeamName, setInputTeamName] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const teamFetch = useTeamStore((state) => state.fetch);
  const setIdeaExists = useIdeaStore((state) => state.setSubmissionExists);
  const setSubmissionExists = useSubmissionStore(
    (state) => state.setSubmissionExists
  );
  const fetchUser = useUserStore((state) => state.fetch);

  const handleDisbandTeam = async () => {
    if (inputTeamName !== teamName) {
      toast.error("You inputted incorrect teamname.");
      return;
    }
    toast.promise(
      async () => {
        await deleteTeam();
        await teamFetch();
        await fetchUser();
        setIdeaExists(false);
        setSubmissionExists(false);
      },
      {
        loading: "Loading...",
        success: "Deleted team!",
        error: (err: ApiError) => err.message,
      }
    );
  };

  const handleUpdateTeamName = async () => {
    toast.promise(updateTeamName(newTeamName), {
      loading: "Loading...",
      success: "Edited Team Name!",
      error: (err: ApiError) => err.message,
    });
  };

  return (
    <Dialog>
      {/* Dialog Content */}
      <DialogTrigger>
        <PenBoxIcon className="w-5 h-5 mr-2" />
      </DialogTrigger>
      <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-0 w-96">
        <DialogHeader>
          <DialogTitle className="font-monomaniac text-white bg-black p-4 mb-4">
            Edit Team
          </DialogTitle>
          <DialogDescription className="text-xl font-bold px-6">
            Team Details
          </DialogDescription>
        </DialogHeader>

        {/* First Set of Elements */}
        <div className="flex flex-col gap-4 px-6 pb-6">
          {/* Input Field */}
          <LabelledInput
            id="team-name"
            labelText="Team Name"
            type="text"
            value={newTeamName}
            onInputChange={setNewTeamName}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-2 mt-2 mb-4" // Add spacing
            inputProps={{
              className: "ring-0 border border-black bg-white py-5 mt-1",
            }}
          />

          {/* Action Buttons */}

          <div className="flex justify-center gap-2 mt-6">
            <CustomButton
              buttonProps={{
                className:
                  "bg-orange-500 font-monomaniac hover:bg-orange-400 active:bg-orange-600 text-white py-6 px-14 rounded-xl text-lg",
              }}
              onClick={handleUpdateTeamName}
            >
              EDIT
            </CustomButton>
          </div>
        </div>

        {/* Disband Team Section */}
        <div className="flex flex-col gap-4 mt-2 px-6 pb-6">
          <DialogDescription className="font-bold text-gray-500 text-xl mb-2">
            Disband Team
          </DialogDescription>

          <LabelledInput
            id="team-name"
            labelText={
              <span className="text-red-600">
                Enter your team name here to disband it
              </span>
            }
            type="text"
            value={inputTeamName}
            onInputChange={setInputTeamName}
            placeholder="Enter Team Name"
            className="border-1 border-black text-red-600 rounded-lg p-3 mt-2" // Add spacing
            inputProps={{
              className: "ring-0 border border-black bg-white py-5 mt-1",
            }}
          />

          <p className="text-gray-400 text-xs -mt-2">
            This action cannot be undone
          </p>

          <div className="flex justify-center gap-4 mt-2">
            <Button
              className={
                "bg-[#F7F3F0] font-monomaniac border-2 border-red-800 font-bold text-[#991b1b] py-6 px-10 rounded-xl text-xl"
              } // Larger button
              onClick={handleDisbandTeam}
            >
              DISBAND
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamDialog;
