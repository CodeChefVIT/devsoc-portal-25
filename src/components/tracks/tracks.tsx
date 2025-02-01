import React from "react";

import {tracks} from "./trackData";
import TrackCard from "./trackCard";

export default function Tracks() {
  return (
    <div className=" flex mt-2 lg:mt-0 md:flex-col flex-row h-full max-h-[calc(100vh-5.5rem)]">
      <aside className="w-full px-0 scrollbar-hide h-full overflow-y-auto bg-[#F7F3F0] border-4 border-black rounded-2xl">
        <div className="hidden lg:block  font-yerk text-xl sticky top-0 bg-[#f7f3f0] p-4 whitespace-nowrap">
          TRACK DETAILS
        </div>
        <div className="p-4 md:flex lg:grid lg:grid-flow-row  gap-4 grid grid-flow-row">
          {tracks.map((track, index) => (
            <TrackCard track={track} key={index}></TrackCard>
          ))}
        </div>
      </aside>
    </div>
  );
}
