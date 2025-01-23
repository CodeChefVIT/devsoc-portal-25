import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
interface Track {
  name: string;
  image: string;
}
const tracks: Track[] = [
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
  { name: "Open Innovation", image: "/track.jpg" },
];
export default function Tracks() {
  return (
    <div  >
      <aside className=" w-80 p-2 overflow-y-scroll bg-[#F7F3F0] border-4 border-black mt-1 pt-4 rounded-2xl">
        <div className="font-yerk mb-4 text-xl">TRACK DETAILS</div>
        {tracks.map((track, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="border shadow-md mb-4 border-black rounded-3xl cursor-pointer">
                <div className=" mt-2  mx-4">{track.name}</div>

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
    </div>
  );
}
