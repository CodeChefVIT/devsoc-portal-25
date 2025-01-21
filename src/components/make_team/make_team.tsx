import React, { useState, useEffect } from "react";
import { PenBoxIcon } from "lucide-react";
import { getTeam } from "@/services/team";
import { getTeamLead } from "@/services/teamlead";
import EditTeamDialog  from "@/components/edit_team/edit_team"; // Import the EditTeamDialog
import RemoveFromTeamDialog from "../remove_from_team/remove_from_team";
 // Import RemoveFromTeamDialog

const MakeTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<string[]>(["", "", "", ""]);
  const [teamCode, setTeamCode] = useState<string>("Loading...");
  const [copied, setCopied] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<string>("TeamLead");
  const [editDialogVisible, setEditDialogVisible] = useState<boolean>(false); // This controls the visibility of the dialog
  const [dialogVisibleIndex, setDialogVisibleIndex] = useState<number | null>(null); // Controls which member's remove dialog is visible

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getTeamLead();
        setLoggedInUser(userData || "User");
      } catch (error) {
        console.error("Failed to fetch logged-in user:", error);
        setLoggedInUser("Error fetching user");
      }
    };
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
    fetchUserData();
  }, []);

  const copyToClipboard = () => {
    if (teamCode !== "Loading..." && teamCode !== "Error fetching code") {
      navigator.clipboard.writeText(teamCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
                  onChange={(e) => setTeamMembers(prev => {
                    const newTeamMembers = [...prev];
                    newTeamMembers[index] = e.target.value;
                    return newTeamMembers;
                  })}
                  placeholder={`Member ${index + 2}`}
                  className="flex-1 border-none outline-none bg-transparent"
                />
                {/* Remove button */}
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveMember(index)} // Open the dialog for this member
                >
                  ⛔
                </button>
              </div>
            ))}
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
