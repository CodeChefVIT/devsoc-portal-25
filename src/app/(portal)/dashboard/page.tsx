"use client";

import React, { useState } from "react";
// import iconContainer from "/public/images/iconContainer.png";
// import github from "/public/images/github.png";
// import settings from "/public/images/settings.png";
// import idea from "/public/images/idea.png";
// import track_pic from "/public/images/track_pic.png";
import Timeline from "@/components/timeline/timeline";
import JoinTeamDialog from "@/components/join_team/join_team";
import CreateTeamDialog from "@/components/create_team/create_team";
import MakeTeam from "@/components/make_team/make_team";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import ProjectSubmission from "@/components/ProjectSubmission";
import ProjectSubmission from "@/components/ProjectSubmission";

// interface Event {
//   time: string;
//   description: string;
// }

interface Track {
  name: string;
  image: string;
}

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

const tracks: Track[] = [
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
];

const Dashboard: React.FC = () => {
  const [, setSelectedTrack] = useState<Track | null>(null); // selectedTrack,

  // Function to determine if the user can make a team or should join/create a team
  const canMakeTeam = (): boolean => {
    // Implement your logic here to check if the user can make a team
    // For example, if the user is an admin or if they are part of a certain group:
    return true; // For now, it always returns true
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}

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
          
                  <Image
                    src="/images/track_pic.png"
                    alt={track.name}
                    layout="intrinsic"  // Use intrinsic layout for natural size
                    width={500}          // Provide the intrinsic width (can be any value)
                    height={300}         // Provide the intrinsic height (can be any value)
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
                  <Image src="images/iconContainer.png" alt="Icon Container" />
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
            <ProjectSubmission></ProjectSubmission>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
