"use client";

import React, { useEffect } from "react";
// import github from "/public/images/github.png";
// import settings from "/public/images/settings.png";
// import idea from "/public/images/idea.png";
// import track_pic from "/public/images/track_pic.png";

import Timeline from "@/components/timeline/timeline";
import TeamView from "@/components/teamView";
import { useTeamStore } from "@/store/team";
import JoinTeam from "@/components/joinTeam";
import Tracks from "@/components/tracks";
import IdeaSubmission from "@/components/IdeaSubmission";
// import ProjectSubmission from "@/components/ProjectSubmission";

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
    <div className="grid grid-cols-1 lg:grid-cols-[27%_auto] gap-4 md:py-0 p-4 ">
      {/* Sidebar */}
      <div className="h-full hidden lg:block">
        <Tracks />
      </div>
      {/* Main Content */}
      <div className="grid grid-rows-[auto_1fr] h-full min-h-0 gap-4">
        {/* Timeline */}
        <div className="overflow-auto rounded-lg min-h-0">
          <Timeline />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  min-h-0 gap-4">
          <div className="flex flex-col items-start justify-start rounded-lg">
            {team.code ? <TeamView /> : <JoinTeam />}
          </div>
          <div className="flex flex-col items-start justify-start rounded-lg">
            {/* <ProjectSubmission /> */}
            {/* uncomment and import  when project submission is active */}
            <IdeaSubmission></IdeaSubmission>
          </div>
        </div>
      </div>
      {/* TODO: Tracks for Mobile */}

      {/* <div className="h-full block lg:hidden">
        <Tracks />
      </div> */}
    </div>
  );
};

export default Dashboard;
