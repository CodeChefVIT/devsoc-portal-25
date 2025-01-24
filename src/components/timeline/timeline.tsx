"use client";
import { useTimerStore } from "@/store/timer";
import React, { useRef, useState, useEffect, useMemo } from "react";

interface Event {
  time: string;
  description: string;
}

const Timeline: React.FC = () => {
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const [hexagonsFilled, setFilledHexagons] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  console.log("Current timeLeft:", timeLeft);
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    // Update ref whenever `timeLeft` changes
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);
  const events: Event[] = useMemo(
    () => [
      {
        time: "10:00 AM",
        description: "Long Description of things happening ",
      },
      {
        time: "11:00 AM",
        description: "Long Description of things happening ",
      },
      {
        time: "12:00 PM",
        description: "Long Description of things happening ",
      },
      { time: "1:00 PM", description: "Long Description of things happening " },
      {
        time: "11:00 PM",
        description: "Long Description of things happening ",
      },
    ],
    [] // Empty dependency array ensures this array is memoized and not recalculated on every render
  );

  // skill issue. This should have dependancy array as [timeLeft]
  // but it wasn't updating everysecond like it should
  // so have to update every second instead
  useEffect(() => {
    // Helper function to convert time strings (like "10:00 AM") into Date objects
    const convertTimeToDate = (timeString: string) => {
      const today = new Date();
      const [time, period] = timeString.split(" ");
      const [hours, minutes] = time.split(":").map(Number);

      let convertedHours = period === "PM" && hours !== 12 ? hours + 12 : hours;
      if (period === "AM" && hours === 12) convertedHours = 0; // Special case for 12 AM

      const date = new Date(today);
      date.setHours(convertedHours, minutes, 0, 0); // Set hours and minutes
      return date;
    };

    const checkTimeMatch = () => {
      const currentTime = new Date(); // Get the current date/time

      // Find the most recent event whose time is less than or equal to the current time
      let latestEventIndex = -1;

      for (let i = 0; i < events.length; i++) {
        const eventTime = convertTimeToDate(events[i].time);

        if (eventTime <= currentTime) {
          latestEventIndex = i; // Update the latest index to this event
        } else {
          break; // Once we find a future event, we can stop
        }
      }

      if (latestEventIndex !== -1) {
        setFilledHexagons(latestEventIndex); // Set to the most recent past event
      } else {
        setFilledHexagons(0); // If no past events, set to 0
      }
    };

    // Call the function every second to check time
    const interval = setInterval(() => {
      checkTimeMatch();
    }, 1000);

    // Cleanup interval when the component unmounts
    return () => clearInterval(interval);
  }, [events]);

  useEffect(() => {
    // Handle horizontal scroll using the mouse wheel
    const handleScroll = (e: WheelEvent) => {
      if (timelineRef.current) {
        // Only scroll horizontally
        timelineRef.current.scrollLeft += e.deltaY;
      }
    };

    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <main>
      {/* Timeline */}
      <div className="border-4 border-black py-5 mt-1 rounded-2xl bg-[#F7F3F0] ">
        <section className="bg-[#F7F3F0] rounded-xl relative">
          <h2 className="font-yerk text-xl font-bold px-3 mb-4">Timeline</h2>

          {/* Scrollable Timeline */}
          <div
            ref={timelineRef}
            className="relative overflow-x-auto scrollbar-hide flex " // Add padding to avoid clipping
          >
            {/* Line Connecting Events */}

            {/* Hexagons */}
            <div className="flex items-center gap-16 min-w-max relative">
              <div className="absolute left-0 w-full transform  flex items-center">
                <div className="h-[4px]  w-full bg-black"></div>
              </div>
              {events.map((event, index) => {
                return (
                  <div key={index} className="flex  flex-col items-center">
                    {/* Time - Above the hexagon */}
                    <div className="font-bold text-lg mb-2">{event.time}</div>

                    {/* Hexagon */}
                    <div className=" flex items-center justify-center">
                      <div
                        className={`w-8 h-8 clip-hexagon   bg-black scale-125 transition-colors duration-300 `}
                      >
                        <div
                          className={`w-full h-full clip-hexagon ${
                            index <= hexagonsFilled
                              ? "bg-[#FF6600]"
                              : "bg-[#F7F3F0] scale-[0.92]"
                          }  transform`}
                        ></div>
                      </div>
                    </div>

                    {/* Description - Below the hexagon */}
                    <div className="text-center mt-2">
                      <div className="text-xs max-w-40 text-wrap text-gray-800">
                        {event.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Timeline;
