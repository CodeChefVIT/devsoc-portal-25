"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteTeam, updateTeamName } from "@/services/team"; // Import the API function
import LabelledInput from "../labelled-input";
import { ApiError } from "next/dist/server/api-utils";
import { useTeamStore } from "@/store/team";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PenBoxIcon } from "lucide-react";

const EditTeamDialog: React.FC = () => {
  const teamName = useTeamStore((state) => state.team.team_name);
  const [inputTeamName, setInputTeamName] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const handleDisbandTeam = async () => {
    if (inputTeamName !== teamName) {
      toast.error("You inputted incorrect teamname.");
      return;
    }
    toast.promise(deleteTeam, {
      loading: "Loading...",
      success: "Deleted team!",
      error: (err: ApiError) => err.message,
    });
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
          {/* <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-2"
          /> */}
          <LabelledInput
            id="team-name"
            labelText="Team Name"
            type="text"
            value={newTeamName}
            onInputChange={setNewTeamName}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-5"
            required
          ></LabelledInput>

          {/* Display Error or Success Message */}

          {/* Action Buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              className={"bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white py-3 px-8 rounded text-lg"}
              onClick={handleUpdateTeamName}
            >
              Edit
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {/* Repeated Title and Description */}
          <DialogTitle className="font-yerk mb-4"></DialogTitle>
          <DialogDescription className="text-sm mb-4">
            Disband Team
          </DialogDescription>

          <p className="text-xs text-red-700">
            {" "}
            Enter your team name here to disband it
          </p>
          {/* Repeated Input Field */}
          <LabelledInput
            id="team-name"
            labelText="Team Name"
            type="text"
            value={inputTeamName}
            onInputChange={setInputTeamName}
            placeholder="Enter New Team Name"
            className="border-2 border-black rounded-lg px-4 py-5"
            required
          ></LabelledInput>

          {/* Repeated Display Error or Success Message */}

          {/* Repeated Action Buttons */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              className={`${"bg-[#F7F3F0] border-4 border-red-800"} text-[#991b1b] py-3 px-8 rounded-lg text-lg`}
              onClick={handleDisbandTeam}
            >
              Disband
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeamDialog;
