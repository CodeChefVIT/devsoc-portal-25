"use client";

import React, { useState } from "react";
import Timeline from "@/components/timeline/timeline";
import JoinTeamDialog from "@/components/join_team/join_team";
import CreateTeamDialog from "@/components/create_team/create_team";
import MakeTeam from "@/components/make_team/make_team";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectSubmission from "@/components/ProjectSubmission";

interface Event {
  time: string;
  description: string;
}

interface Track {
  name: string;
  image: string;
}

const events: Event[] = [
  { time: "9:00 AM", description: "Long Description of things happening" },
  { time: "10:00 AM", description: "Another description of an event" },
  { time: "11:00 AM", description: "More event details here" },
  { time: "9:00 AM", description: "Long Description of things happening" },
  { time: "10:00 AM", description: "Another description of an event" },
  { time: "11:00 AM", description: "More event details here" },
  { time: "9:00 AM", description: "Long Description of things happening" },
  { time: "10:00 AM", description: "Another description of an event" },
  { time: "11:00 AM", description: "More event details here" },
];

const tracks: Track[] = [
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
];

const Dashboard: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [teamMembers, setTeamMembers] = useState<number>(0); // State to track the number of team members

  // Function to determine if the user can make a team or should join/create a team
  const hasMinimumTeamMembers = (): boolean => {
    // Replace this with actual logic to determine team size
    const teamMembersCount = 4; // Example team member count
    return teamMembersCount >= 3;
  };

  const canMakeTeam = (): boolean => {
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 p-4 gap-6 ">
        {/* Sidebar */}
        <aside className="w-1/4 p-2 overflow-y-scroll bg-[#F7F3F0] border-4 border-black mt-1 pt-4 rounded-2xl">
          <div className="font-yerk mb-4 text-xl">TRACK DETAILS</div>
          {tracks.map((track, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className="border shadow-md mb-4 border-black rounded-3xl cursor-pointer"
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="text-center mt-2 font-bold">{track.name}</div>
                  <img
                    src="/images/track_pic.png"
                    alt={track.name}
                    className="w-full"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
                <DialogHeader>
                  <DialogTitle className="font-yerk mb-6">
                    Track Details
                  </DialogTitle>
                  <DialogDescription className="">
                    <b className="mb-3">Hardware Problems</b>
                    <div>
                      <li>
                        Detailed information about the track goes here. You can
                        add descriptions, links, or anything else related to the
                        track.
                      </li>
                      <li>
                        Detailed information about the track goes here. You can
                        add descriptions, links, or anything else related to the
                        track.
                      </li>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-1 mb-4">
          {/* Timeline */}
          <Timeline />

          {/* Dev Team and Project Submission Boxes */}
          <div className="flex gap-4 mt-6">
            {/* Dev Team Box */}
            {canMakeTeam() ? (
              <MakeTeam />
            ) : (
              <div className="border-4 flex-1 rounded-xl shadow-m border-black overflow-hidden bg-[#F7F3F0]">
                <div className="font-bold bg-black h-[40px] text-white flex justify-between px-4 items-center">
                  Your Devsoc Team
                  <div className="w-4 h-4 border-2 border-black rounded-full bg-white"></div>
                </div>
                <div className="flex items-center justify-center bg-[#F7F3F0] mt-10 mb-10">
                  <img src="images/iconContainer.png" alt="Icon Container" />
                </div>
                <div className="text-sm mb-4 text-center">
                  No Team Members Yet?
                </div>
                <div className="flex gap-2 justify-center">
                  <JoinTeamDialog />
                  <CreateTeamDialog />
                </div>
              </div>
            )}

            {/* Project Submission Box */}
            <div
              className={` ${
                !hasMinimumTeamMembers() ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <ProjectSubmission />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
