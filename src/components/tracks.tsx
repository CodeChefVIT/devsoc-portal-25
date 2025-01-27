import React from "react";

import { Track } from "@/interfaces";
import TrackCard from "./trackCard";

const tracks: Track[] = [
  {
    name: "Media and Entertainment",
    description: ["Dive into the world of creativity and innovation in media and entertainment. Build solutions that redefine how content is created, consumed, and shared. Whether it's immersive AR/VR experiences, AI-generated content, personalized streaming platforms, or innovative storytelling tools, your ideas can reshape the future of entertainment."],
    image: "/track.jpg",
  },
  {
    name: "Finance and Fintech",
    description: [
      "Empower the financial sector with groundbreaking solutions. Develop applications that revolutionize digital banking, payment systems, cryptocurrency, and financial literacy. Whether you’re enhancing security, promoting financial inclusion, or creating tools for investment and budgeting, this track is all about reshaping the future of money.",
    ],
    image: "/track.jpg",
  },
  {
    name: "Healthcare and Education",
    description: ["Combine the power of technology with compassion and knowledge to create impactful solutions. In healthcare, innovate ways to improve patient care, diagnosis, and accessibility. In education, craft tools that enhance learning experiences, increase inclusivity, or gamify knowledge acquisition. Your solutions can bridge gaps and make essential services more accessible to everyone."],
    image: "/track.jpg",
  },
  {
    name: "Digital Security",
    description: ["In an increasingly connected world, digital security is more critical than ever. Build tools and systems that protect sensitive data, combat cyber threats, and ensure privacy. From secure authentication methods to innovative threat detection, this track challenges you to safeguard the digital future."],
    image: "/track.jpg",
  },
  {
    name: "Environment and Sustainability",
    description: ["Leverage technology to tackle environmental challenges and promote sustainability. Create solutions that reduce waste, optimize energy consumption, or monitor environmental impact. Whether it’s through smart agriculture, renewable energy innovations, or eco-conscious applications, your ideas can help pave the way for a greener future."],
    image: "/track.jpg",
  },
  {
    name: "Open Innovation",
    description: ["Think outside the box and break free from predefined boundaries. This track encourages you to explore uncharted territories, bringing any unique, impactful idea to life. If you have an out-of-the-ordinary solution that doesn’t fit into the other tracks, this is your space to shine."],
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
