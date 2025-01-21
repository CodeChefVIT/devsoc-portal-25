"use client";

import React, { useState, useEffect } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline"; // Ensure correct import
import EditTeamDialog from "../edit_team/edit_team";
import { useTeamStore } from "@/store/team";
import { useUserStore } from "@/store/user";

const MakeTeam = () => {
  const user = useUserStore((state) => state.user);

  const team = useTeamStore((state) => state.team);
  const teamFetch = useTeamStore((state) => state.fetch);
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch the team code from the API
  useEffect(() => {
    teamFetch();
  }, [teamFetch]);



  const removeMember = () => {};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(team.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

            {/* Input boxes for other team members */}
            {team.members.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-black rounded-lg p-2"
              >
                {member.is_leader ? (
                  <div className="flex justify-between items-center bg-white border border-black rounded-lg p-2">
                    <span>{member.first_name + " " + member.last_name}</span>
                    <span className="text-yellow-500">👑</span>
                  </div>
                ) : (
                  <div className="flex-1 border-none outline-none bg-transparent">
                    {member.first_name + " " + member.last_name}
                    {user.is_leader && (
                      <button
                        className="text-red-500"
                        onClick={() => removeMember()}
                      >
                        ⛔
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Add Member Button */}
          </div>
        </div>

        {/* Team Code */}
        <div className="text-center mt-6">
          <div className="text-sm">Team Code</div>
          <div className="bg-orange-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 mt-2">
            <span>{team.code}</span>
            <button
              onClick={copyToClipboard}
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
