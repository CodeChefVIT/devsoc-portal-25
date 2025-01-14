"use client";

import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import EditTeamDialog from "../edit_team/edit_team";
const MakeTeam: React.FC = () => {

  const [teamMembers, setTeamMembers] = useState<string[]>([
    "Ansuka", "Ansuka", "Ansuka", "Ansuka", "Ansuka"
  ]);


  const removeMember = (index: number) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newTeamMembers);
  };

  
  const addMember = () => {
    if (teamMembers.length < 5) {
      setTeamMembers([...teamMembers, "Ansuka"]); // You can replace "Ansuka" with dynamic values
    }
  };

  return (
    <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0]">
      {/* Header */}
      <div className="font-bold bg-black h-[40px] text-white flex justify-between px-4 items-center">
        Your Devsoc Team
        <EditTeamDialog/>
          
      </div>


      <div className="p-4">
        {/* Team Member List */}
        <div className="mb-6">
          <div className="flex flex-col gap-2">
            {teamMembers.map((name, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border border-black rounded-lg p-2"
              >
                <span>{name}</span>
                {index === 0 ? (
                  <span className="text-yellow-500">👑</span>
                ) : (
                  <button
                    className="text-red-500"
                    onClick={() => removeMember(index)}
                  >
                    ⛔
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>


        {teamMembers.length < 5 && (
          <div className="text-center mt-4">
            <button
              className="bg-green-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2"
              onClick={addMember}
            >
              <span>➕</span>
              <span>Add Team Member</span>
            </button>
          </div>
        )}

        {/* Team Code */}
        <div className="text-center mt-6">
          <div className="text-sm">Team Code</div>
          <div className="bg-orange-500 text-white rounded-lg px-4 py-2 inline-flex items-center gap-2 mt-2">
            <span>📋</span>
            <span>#9SAJJD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeTeam;
