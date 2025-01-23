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
import CustomButton from "../CustomButton";

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

  const leave = () => {
    toast.promise(leaveTeam(), {
      loading: "Leaving team...",
      success: "Left team successfully",
      error: (err: ApiError) => err.message,
    });
  };

  return (
    <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0] flex flex-col">
      {/* Header */}
      <div className="font-monomaniac bg-black h-[40px] text-white flex justify-between px-4 items-center">
        Your Devsoc Team
        <EditTeamDialog />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Team Member List */}
        <div className="mb-6 justify-between flex-grow">
          <div className="flex flex-col justify-between gap-2">
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
          </div>
        </div>

        {/* Team Code & Leave Button - Stays at the Bottom */}
        <div className="mt-auto">
          <div className="text-center mt-6">
            <div className="flex items-center gap-4 justify-center">
              <div>
                <CustomButton onClick={leave}>Leave team</CustomButton>
              </div>
              <div>
                <CustomButton icon={<IoMdCopy />} onClick={copyToClipboard}>
                  {team.code}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
