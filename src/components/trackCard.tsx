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
export default function trackCard({
  track,
}: {
  track: Track;
}) {
  return (
    <div>
      <Dialog>
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
            <DialogTitle className="font-yerk mb-6">Track Details</DialogTitle>

            <div className=" text-gray-500">
              <div className="font-bold mb-3 ">{track.name}</div>
              <div>
                <div>
                  <div>
                    <ul className="list-disc list-inside space-y-2">
                      {track.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
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
