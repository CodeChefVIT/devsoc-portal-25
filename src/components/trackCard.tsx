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
          <div className="cursor-pointer overflow-hidden">
            <div className="border rounded-t-3xl w-full h-[40px] md:w-full border-black p-2">
              {track.name}
            </div>
            <Image
              src={`/images/${track.image}`}
              alt={track.name}
              layout="" // Use intrinsic layout for natural size
              width={800} // Provide the intrinsic width (can be any value)
              height={200} // Provide the intrinsic height (can be any value)
              className="h-[100px] w-full xl:w-[800px] md:w-[800px] object-fill"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-[#F7F3F0] border-4 border-black rounded-lg p-4  w-full">
          <DialogHeader>
            <DialogTitle className="font-yerk text-3xl pt-3">Track Details</DialogTitle>
            <div className=" text-gray-500">
              <div className="font-bold pt-5 text-2xl">{track.name}</div>
              <div>
                <div>
                  <div>
                    <ul className="list-disc list-inside space-y-2 pt-4 text-xl leading-9 ">
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
