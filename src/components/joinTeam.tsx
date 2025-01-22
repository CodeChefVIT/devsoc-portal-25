import React from "react";
import JoinTeamDialog from "./dialogs/join_team";
import CreateTeamDialog from "./dialogs/create_team";
import Image from "next/image";
import iconContainer from "../../public/images/iconContainer.png";

export default function joinTeam() {
  return (
    <div>
      <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0]">
        <div className="font-bold bg-black h-[40px] text-white flex justify-between px-4 items-center">
          Your Devsoc Team
          <div className="w-4 h-4 border-2 border-black rounded-full bg-white"></div>
        </div>
        <div className="px-20 py-9">
          <div className="flex  items-center justify-center bg-[#F7F3F0] mt-10 mb-10">
            <Image
              src={iconContainer}
              alt="Icon Container"
              width={70}
              height={70}
              layout="intrinsic" // Use intrinsic layout for natural size
            />
          </div>
          <div className="text-sm mb-4 text-center">No Team Members Yet?</div>
          <div className="flex gap-2 justify-center">
            <JoinTeamDialog />
            <CreateTeamDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
