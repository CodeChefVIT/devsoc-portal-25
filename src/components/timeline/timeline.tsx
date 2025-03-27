"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";

interface Event {
  time: string;
  description: string;
}

const getDayValue = () => {
  const today = new Date();
  const day = today.getDate();

  if (day === 29) return 0;
  else if (day === 30) return 1;
  else if (day === 31) return 2;
  return 0;
};

const Timeline: React.FC = () => {
  const [, setDay] = useState(getDayValue());
  useEffect(() => {
    setDay(getDayValue());
    const intervalId = setInterval(() => {
      setDay(getDayValue());
    }, 12 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [hexagonsFilled, setFilledHexagons] = useState<number>(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const events: Event[] = useMemo(
    () => [
      { time: "8:00 PM Mar 29", description: "Hack Commencement" },
      { time: "12:00 AM Mar 30", description: "Review 1 (Idea and tech feasibility)" },
      { time: "10:00 PM Mar 30", description: "Review 2 (Technical Implementation)" },
      { time: "3:00 PM Mar 31", description: "Final Pitches" },
    ],
    []
  );

  useEffect(() => {
    const convertTimeToDate = (timeString: string) => {
      const [time, period, , day] = timeString.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      const normalizedPeriod = period.toUpperCase();
      const dateNum = parseInt(day);

      let convertedHours = normalizedPeriod === "PM" && hours !== 12 ? hours + 12 : hours;
      if (normalizedPeriod === "AM" && hours === 12) convertedHours = 0;

      const date = new Date(2025, 2, dateNum);
      date.setHours(convertedHours, minutes, 0, 0);
      return date;
    };

    const checkTimeMatch = () => {
      const currentTime = new Date();
      let totalFilled = 0;

      for (let i = 0; i < events.length; i++) {
        const eventTime = convertTimeToDate(events[i].time);
        if (eventTime <= currentTime) {
          totalFilled++;
        } else {
          break;
        }
      }
      setFilledHexagons(totalFilled - 1 >= 0 ? totalFilled - 1 : 0);
    };

    const interval = setInterval(checkTimeMatch, 1000);
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="border-4 border-black pt-8 pb-6 rounded-2xl bg-[#F7F3F0] overflow-hidden">
      <section className="bg-[#F7F3F0] rounded-xl relative">
        <div className="flex justify-between mb-6">
          <h2 className="font-yerk text-2xl font-bold px-8">Timeline</h2>
        </div>

        <div
          ref={timelineRef}
          className="relative overflow-y-hidden overflow-x-auto scrollbar-hide flex"
        >
          <div className="relative flex items-center gap-20 min-w-max mx-auto">
            {/* Connecting Line */}
            <div
              className="absolute h-[6px] bg-black"
              style={{
                left: "0",
                right: "0",
                top: "calc(50% - 18px)",
                width: "100%", // Ensures the line spans the full content width
              }}
            ></div>

            <div className="grid grid-flow-col px-40 gap-28">
              {events.map((event, eventIndex) => (
                <div key={eventIndex} className="flex flex-col items-center">
                  <div className="font-bold text-xl mb-4">{event.time}</div>
                  {/* Hexagon */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-12 h-12 ${
                        eventIndex <= hexagonsFilled
                          ? ""
                          : "clip-hexagon bg-black"
                      } transition-colors duration-300`}
                    >
                      <div
                        className={`w-full h-full clip-hexagon ${
                          eventIndex <= hexagonsFilled
                            ? "bg-[#315273] scale-[1.30]"
                            : "bg-[#F7F3F0] scale-[0.83]"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center min-h-12 mt-4">
                    <div className="text-sm max-w-48 overflow-visible text-wrap text-gray-800">
                      {event.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
