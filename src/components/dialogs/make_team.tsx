import React, { useState, useEffect } from "react";
import RemoveFromTeamDialog from "./remove_from_team";
import { IoMdCopy } from "react-icons/io";
import { LuCrown } from "react-icons/lu";

import EditTeamDialog from "./edit_team";
import { useTeamStore } from "@/store/team";
import { useUserStore } from "@/store/user";
import { leaveTeam } from "@/services/team";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

const TeamView = () => {
  const user = useUserStore((state) => state.user);

  const team = useTeamStore((state) => state.team);

  const teamFetch = useTeamStore((state) => state.fetch);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    teamFetch();
  }, [teamFetch]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(team.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  function leave() {
    toast.promise(leaveTeam(), {
      loading: "Leaving team...",
      success: "Left team successfully",
      error: (err: ApiError) => err.message,
    });
  }

  return (
    <div className="border-4 flex-1 rounded-xl  shadow-m border-black overflow-hidden bg-[#F7F3F0]">
      {/* Header */}
      <div className="font-monomaniac  bg-black h-[40px] text-white flex justify-between px-4 items-center">
        Your Devsoc Team
        <EditTeamDialog />
      </div>

      <div className="p-4">
        {/* Team Member List */}
        <div className="mb-6 justify-between">
          <div className="flex flex-col justify-between gap-2">
            {/* Fixed box for logged-in user */}

            {/* Input boxes for other team members */}
            {user.is_leader ? (
              <div className="flex justify-between items-center bg-white border border-black rounded-lg p-2">
                <span>{user.first_name + " " + user.last_name}</span>
                <span className="text-yellow-500">
                  <LuCrown />
                </span>
              </div>
            ) : (
              <div className="flex-1 border-none outline-none bg-transparent">
                {user.first_name + " " + user.last_name}
              </div>
            )}
            {team.members.map((member, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-black rounded-lg p-2"
              >
                {member.is_leader ? (
                  <div className="flex justify-center items-center bg-white border border-black rounded-lg p-2">
                    <span>{member.first_name + " " + member.last_name}</span>
                    <span className="text-yellow-500">👑</span>
                  </div>
                ) : (
                  <div className="flex-1 border-none outline-none bg-transparent">
                    {member.first_name + " " + member.last_name}
                    {user.is_leader && (
                      <RemoveFromTeamDialog email={member.email} />
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
          {" "}
          <div className="flex items-center gap-4 justify-center">
            <div>
              <div>leave team</div>
              <div className="bg-orange-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 mt-2">
                <button
                  onClick={leave}
                  className="text-white font-medium px-2 py-1 rounded-lg  flex items-center"
                >
                  Leave team
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm">Team Code</div>
              <div className="bg-orange-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 mt-2">
                <IoMdCopy />
                <div>{team.code}</div>
                <button
                  onClick={copyToClipboard}
                  className="text-white font-medium px-2 py-1 rounded-lg ml-4 flex items-center"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Edit Team Dialog on pen icon click */}
    </div>
  );
};

export default TeamView;
