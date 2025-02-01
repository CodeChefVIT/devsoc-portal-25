import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { tracks } from "./trackData";
import TrackCard from "./trackCard";

export default function CarouselDemo() {
  return (
    <Card className="border-4 w-full border-black rounded-lg">
      <CardHeader className="w-full p-3 bg-black text-white">
        <CardTitle className="flex font-monomaniac  tracking-wider items-center justify-between">
          <p className="mb-1">Tracks</p>
          <span className="inline-block ml-2 h-3 w-3 rounded-full bg-white"></span>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`rounded-xl flex flex-col bg-cc-plain items-center gap-4 p-4`}
      >
        <Carousel className="md:w-5/6 w-4/5">
          <CarouselContent>
            {tracks.map((track, index) => (
              <CarouselItem className="md:basis-1/3" key={index}>
                <div>
                  <TrackCard track={track} key={index}></TrackCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
