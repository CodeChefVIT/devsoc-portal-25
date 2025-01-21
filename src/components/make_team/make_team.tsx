"use client";

import React, { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { ClipboardIcon } from "@heroicons/react/24/outline"; // Ensure correct import
import EditTeamDialog from "../edit_team/edit_team";
import { getTeam } from "@/services/team";

const MakeTeam: React.FC = () => {
  const loggedInUser = "Ansuka"; // Replace with actual login logic
  const [teamMembers, setTeamMembers] = useState<string[]>(["", "", "", ""]);
  const [teamCode, setTeamCode] = useState<string>("Loading...");
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch the team code from the API
  useEffect(() => {
    const fetchTeamCode = async () => {
      try {
        const response = await getTeam();
        setTeamCode(response || "No code available");
      } catch (error) {
        console.error("Failed to fetch team code:", error);
        setTeamCode("Error fetching code");
      }
    };

    fetchTeamCode();
  }, []);

  const updateMember = (index: number, value: string) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = value;
    setTeamMembers(newTeamMembers);
  };

  const addMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([...teamMembers, ""]);
    }
  };

  const removeMember = (index: number) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index); 
    setTeamMembers(newTeamMembers);
  };

  const copyToClipboard = () => {
    if (teamCode !== "Loading..." && teamCode !== "Error fetching code") {
      navigator.clipboard.writeText(teamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0]">
      {/* Header */}
      <div className="font-monomaniac bg-black h-[40px] text-white flex justify-between px-4 items-center">
        Your Devsoc Team
        <EditTeamDialog />
      </div>

      <div className="p-4">
        {/* Team Member List */}
        <div className="mb-6">
          <div className="flex flex-col gap-2">
            {/* Fixed box for logged-in user */}
            <div className="flex justify-between items-center bg-white border border-black rounded-lg p-2">
              <span>{loggedInUser}</span>
              <span className="text-yellow-500">👑</span>
            </div>

            {/* Input boxes for other team members */}
            {teamMembers.map((name, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-black rounded-lg p-2"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => updateMember(index, e.target.value)}
                  placeholder={`Member ${index + 2}`}
                  className="flex-1 border-none outline-none bg-transparent"
                />
                <button
                  className="text-red-500"
                  onClick={() => removeMember(index)}
                >
                  ⛔
                </button>
              </div>
            ))}
            {/* Add Member Button */}
            
          </div>
        </div>

        {/* Team Code */}
        <div className="text-center mt-6">
          <div className="text-sm">Team Code</div>
          <div className="bg-orange-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 mt-2">
            <span>{teamCode}</span>
            <button
              onClick={copyToClipboard}
              disabled={teamCode === "Loading..." || teamCode === "Error fetching code"}
              className="text-white font-medium px-2 py-1 rounded-lg ml-4 flex items-center"
            >
              <ClipboardIcon className="w-5 h-5 mr-2" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;
