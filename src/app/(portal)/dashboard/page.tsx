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
import Tracks from "@/components/dashboard";

// interface Event {
//   time: string;
//   description: string;
// }

// const events: Event[] = [
//   { time: "9:00 AM", description: "Long Description of things happening" },
//   { time: "10:00 AM", description: "Another description of an event" },
//   { time: "11:00 AM", description: "More event details here" },
//   { time: "9:00 AM", description: "Long Description of things happening" },
//   { time: "10:00 AM", description: "Another description of an event" },
//   { time: "11:00 AM", description: "More event details here" },
//   { time: "9:00 AM", description: "Long Description of things happening" },
//   { time: "10:00 AM", description: "Another description of an event" },
//   { time: "11:00 AM", description: "More event details here" },
// ];

const Dashboard: React.FC = () => {
  const fetchTeamInfo = useTeamStore((state) => state.fetch);
  const team = useTeamStore((state) => state.team);
  // Function to determine if the user can make a team or should join/create a team

  useEffect(() => {
    async function fetchInfo() {
      await fetchTeamInfo();
    }
    fetchInfo();
  }, [fetchTeamInfo]);

  return (
    <div className=" flex flex-col">
      {/* Header */}

      <div className="flex flex-1 p-4 gap-6 ">
        {/* Sidebar */}
        <Tracks></Tracks>

        {/* Main Content */}
        <main className="w-3/4 p-1 mb-4">
          {/* Timeline */}
          <Timeline />

          {/* Dev Team and Project Submission Boxes */}
          <div className="flex gap-4 mt-6">
            {/* Dev Team Box */}
            {team ? <TeamView /> : <JoinTeam />}

            {/* Project Submission Box */}
            <ProjectSubmission></ProjectSubmission>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
