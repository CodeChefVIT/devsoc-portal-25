"use client";

import React, { useEffect } from "react";
// import github from "/public/images/github.png";
// import settings from "/public/images/settings.png";
// import idea from "/public/images/idea.png";
// import track_pic from "/public/images/track_pic.png";

import Timeline from "@/components/timeline/timeline";
import TeamView from "@/components/dialogs/make_team";
import ProjectSubmission from "@/components/ProjectSubmission";
import { useTeamStore } from "@/store/team";
import JoinTeam from "@/components/joinTeam";
import Tracks from "@/components/tracks";

const Dashboard: React.FC = () => {
  const fetchTeamInfo = useTeamStore((state) => state.fetch);
  const team = useTeamStore((state) => state.team);

  useEffect(() => {
    async function fetchInfo() {
      await fetchTeamInfo();
    }
    fetchInfo();
  }, [fetchTeamInfo]);

  return (
    <div className="h-screen grid grid-cols-[30%_70%]">
      {/* Sidebar (30% width) */}
      <div className="h-full p-4 ">
        <Tracks />
      </div>

      {/* Main Content (70% width) */}
      <div className="grid grid-rows-[auto_1fr] gap-4 p-2 h-full min-h-0">
        {/* Timeline (1st row) */}
        <div className="overflow-auto rounded-lg p-2 min-h-0">
          <Timeline />
        </div>

        {/* Team Box and Project Submission (2nd row) */}
        <div className="grid grid-cols-2 gap-1 min-h-0">
          {/* Dev Team Box */}
          <div className="flex flex-col items-start justify-start  rounded-lg p-3 h-[75%]">
            {team ? <TeamView /> : <JoinTeam />}
          </div>

          {/* Project Submission Box */}
          <div className="flex flex-col items-start justify-start rounded-lg p-3 h-[75%]">
            <ProjectSubmission />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
