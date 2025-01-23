import React from "react";

import { Track } from "@/interfaces";
import TrackCard from "./trackCard";

const tracks: Track[] = [
  {
    name: "Open Innovation",
    description: ["Description 1", "Description 2"],
    image: "/track.jpg",
  },
  {
    name: "Open Innovation",
    description: [
      "The NFT Minting Website is designed to be platform-independent, capable of running on a wide range of hardware configurations, including desktop computers, laptops, tablets, and mobile devices.",
      "It should be compatible with standard hardware components such as processors, memory, storage devices, and network interfaces.",
    ],
    image: "/track.jpg",
  },
  {
    name: "Open Innovation",
    description: ["Description 1", "Description 2"],
    image: "/track.jpg",
  },
  {
    name: "Open Innovation",
    description: ["Description 1", "Description 2"],
    image: "/track.jpg",
  },
  {
    name: "Open Innovation",
    description: ["Description 1", "Description 2"],
    image: "/track.jpg",
  },
];

export default function Tracks() {
  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-5.5rem)]">
      <aside className=" w-full p-7 px-5 scrollbar-hide h-[700px] overflow-y-auto bg-[#F7F3F0] border-4 border-black mt-1 pt-4 rounded-2xl">
        <div className="font-yerk mb-4 text-xl">TRACK DETAILS</div>
        {tracks.map((track, index) => (
          <TrackCard track={track} key={index}></TrackCard>
        ))}
      </aside>
    </div>
  );
}
