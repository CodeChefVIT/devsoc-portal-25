import React, { useState, useEffect } from "react";
import { PenBoxIcon } from "lucide-react";
import RemoveFromTeamDialog from "../remove_from_team/remove_from_team";
import { IoMdCopy } from "react-icons/io";

import EditTeamDialog from "../edit_team/edit_team";
import { useTeamStore } from "@/store/team";
import { useUserStore } from "@/store/user";
import toast from "react-hot-toast";

const MakeTeam = () => {
  const user = useUserStore((state) => state.user);

  const team = useTeamStore((state) => state.team);
  const removeMember = useTeamStore((state) => state.removeMember);

  const teamFetch = useTeamStore((state) => state.fetch);
  const [copied, setCopied] = useState<boolean>(false);
  const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false); // This controls the visibility of the dialog
  const [dialogVisibleIndex, setDialogVisibleIndex] = useState<number | null>(
    null
  ); // Controls which member's remove dialog is visible

  useEffect(() => {
    teamFetch();
  }, [teamFetch]);

  const kickMember = (email: string) => {
    toast.promise(removeMember(email), {
      loading: "Removing member...",
      success: "Member removed successfully",
      error: "Failed to remove member",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(team.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveMember = (index: number) => {
    setDialogVisibleIndex(index); // Set the member's index to show the remove dialog
  };

  const closeRemoveDialog = () => {
    setDialogVisibleIndex(null); // Close the remove dialog
  };

  return (
    <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0]">
      {/* Header */}
      <div className="font-monomaniac bg-black h-[40px] text-white flex justify-between px-4 items-center">
        Your Devsoc Team
        <button onClick={() => setEditDialogVisible(true)}>
          <PenBoxIcon className="w-5 h-5 mr-2" />
        </button>
      </div>

      <div className="p-4">
        {/* Team Member List */}
        <div className="mb-6">
          <div className="flex flex-col gap-2">
            {/* Fixed box for logged-in user */}

            {/* Input boxes for other team members */}
            {user.is_leader ? (
              <div className="flex justify-between items-center bg-white border border-black rounded-lg p-2">
                <span>{user.first_name + " " + user.last_name}</span>
                <span className="text-yellow-500">👑</span>
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
                        onClick={() => kickMember(member.email)} // or handle remove member
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
            <IoMdCopy />
            <span>{team.code}</span>
            <button
              onClick={copyToClipboard}
              className="text-white font-medium px-2 py-1 rounded-lg ml-4 flex items-center"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* Open Edit Team Dialog on pen icon click */}
      {editDialogVisible && (
        <EditTeamDialog
          isOpen={editDialogVisible}
          onClose={() => setEditDialogVisible(false)} // Close dialog on action
        />
      )}

      {/* Open Remove From Team Dialog for selected member */}
      {dialogVisibleIndex !== null && (
        <RemoveFromTeamDialog
          isOpen={dialogVisibleIndex !== null}
          onClose={closeRemoveDialog}
          memberIndex={dialogVisibleIndex}
        />
      )}
    </div>
  );
};

export default MakeTeam;
