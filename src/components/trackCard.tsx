import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Track } from "@/interfaces";
import Image from "next/image";
export default function trackCard({ track }: { track: Track }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" mb-4  rounded-3xl cursor-pointer overflow-hidden">
            <div className="border rounded-t-3xl pt-2 px-4 bg-white pb-1 border-black">
              {track.name}
            </div>

            <Image
              src="/images/track_pic.png"
              alt={track.name}
              layout="intrinsic" // Use intrinsic layout for natural size
              width={800} // Provide the intrinsic width (can be any value)
              height={600} // Provide the intrinsic height (can be any value)
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#F7F3F0] border-4 border-black rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="font-yerk mb-6">Track Details</DialogTitle>

            <div className=" text-gray-500">
              <div className="font-bold mb-3 ">{track.name}</div>
              <div>
                <div>
                  <div>
                    <ul className="list-disc list-inside space-y-2">
                      {track.description.map((desc, index) => (
                        <div key={index}>{desc}</div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
