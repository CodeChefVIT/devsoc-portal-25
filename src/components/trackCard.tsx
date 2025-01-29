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
          <div className="cursor-pointer overflow-hidden h-full">
            <div className="border rounded-t-3xl bg-white border-black p-2">
              {track.name}
            </div>

            <Image
              src={`/images/${track.image}`}
              alt={track.name}
              layout="intrinsic" // Use intrinsic layout for natural size
              width={800} // Provide the intrinsic width (can be any value)
              height={600} // Provide the intrinsic height (can be any value)
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#F7F3F0] border-4 border-black rounded-lg p-4 h-full w-full">
          <DialogHeader>
            <DialogTitle className="font-yerk">Track Details</DialogTitle>
            <div className=" text-gray-500">
              <div className="font-bold">{track.name}</div>
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
