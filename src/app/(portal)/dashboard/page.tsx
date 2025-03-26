"use client";

import React, { useEffect } from "react";
import TeamView from "@/components/teamView";
import { useTeamStore } from "@/store/team";
import JoinTeam from "@/components/joinTeam";
import TracksMobile from "@/components/tracks/trackMobile";
import Timeline from "@/components/timeline/timeline";
import ProjectSubmission from "@/components/ProjectSubmission";

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
    <div className="grid w-full grid-cols-1 gap-4 md:py-0 p-4">
      {/* Main Content */}
      <div className="flex flex-col lg:grid grid-rows-[auto_1fr] h-full min-h-0 gap-4">
        {/* Timeline */}
        <div className="overflow-auto rounded-lg min-h-0">
          <Timeline />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 gap-4">
          <div className="flex flex-col items-start justify-start rounded-lg">
            {team.code ? <TeamView /> : <JoinTeam />}
          </div>
          <div className="flex flex-col items-start justify-start rounded-lg">
            <ProjectSubmission />
          </div>
        </div>
      </div>
      {/* <div className="lg:hidden mb-5 justify-center flex">
        <TracksMobile />
      </div> */}
    </div>
  );
};

export default Dashboard;