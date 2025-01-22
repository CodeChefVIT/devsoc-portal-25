"use client";

import React, { useEffect, useState } from "react";
// import github from "/public/images/github.png";
// import settings from "/public/images/settings.png";
// import idea from "/public/images/idea.png";
// import track_pic from "/public/images/track_pic.png";

import Timeline from "@/components/timeline/timeline";
import TeamView from "@/components/dialogs/make_team";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectSubmission from "@/components/ProjectSubmission";
import { useTeamStore } from "@/store/team";
import JoinTeam from "@/components/joinTeam";

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
                    layout="intrinsic" // Use intrinsic layout for natural size
                    width={500} // Provide the intrinsic width (can be any value)
                    height={300} // Provide the intrinsic height (can be any value)
                    className="w-full"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-[#F7F3F0] border-2 border-black rounded-lg p-6">
                <DialogHeader>
                  <DialogTitle className="font-yerk mb-6">
                    Track Details
                  </DialogTitle>

                    <div className=" text-gray-500">
                      <div className="font-bold mb-3 ">Hardware Problems</div>
                      <div>
                        <div>
                          <div>
                            Detailed information about the track goes here. You can
                            add descriptions, links, or anything else related to the
                            track.
                          </div>
                          <div>
                            Detailed information about the track goes here. You can
                            add descriptions, links, or anything else related to the
                            track.
                          </div>
                        </div>
                      </div>
                    </div>
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
            {!team ? <TeamView /> : <JoinTeam />}

            {/* Project Submission Box */}
            <ProjectSubmission></ProjectSubmission>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
