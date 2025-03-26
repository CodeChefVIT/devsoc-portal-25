"use client";
// import { useTimerStore } from "@/store/timer";
import React, { useRef, useState, useEffect, useMemo } from "react";
import CustomButton from "../CustomButton";

interface Event {
  time: string;
  description: string;
}

const getDayValue = () => {
  const today = new Date();
  const day = today.getDate();

  if (day === 29) {
    return 0; // Saturday, March 29
  } else if (day === 30) {
    return 1; // Sunday, March 30
  } else if (day === 31) {
    return 2; // Monday, March 31
  } else {
    return 0; // Default to first day if outside the range
  }
};

const Timeline: React.FC = () => {
  // const timeLeft = useTimerStore((state) => state.timeLeft);
  const [day, setDay] = useState(getDayValue());
  useEffect(() => {
    setDay(getDayValue());

    const intervalId = setInterval(() => {
      setDay(getDayValue());
    }, 12 * 60 * 60 * 1000); // Check every 12 hours

    return () => clearInterval(intervalId);
  }, []);
  const [hexagonsFilled, setFilledHexagons] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(day);

  const timelineRef = useRef<HTMLDivElement>(null);

  const days: Event[][] = useMemo(
    () => [
      // Day 1 - March 29, 2025 (Saturday)
      [
        { time: "8:00 PM", description: "Hack Commencement" },
        { time: "12:00 AM", description: "Review 1 (Idea and tech feasibility)" },
      ],
      // Day 2 - March 30, 2025 (Sunday)
      [
        { time: "10:00 PM", description: "Review 2 (Technical Implementation)" },
      ],
      // Day 3 - March 31, 2025 (Monday)
      [
        { time: "3:00 PM", description: "Final Pitches" },
      ],
    ],
    []
  );

  useEffect(() => {
    const convertTimeToDate = (timeString: string, eventDay: number) => {
      const baseDate = new Date(2025, 2, 29); // March 29, 2025
      const [time, period] = timeString.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      const normalizedPeriod = period.toUpperCase();

      let convertedHours =
        normalizedPeriod === "PM" && hours !== 12 ? hours + 12 : hours;
      if (normalizedPeriod === "AM" && hours === 12) convertedHours = 0;

      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + eventDay);
      date.setHours(convertedHours, minutes, 0, 0);
      return date;
    };

    const checkTimeMatch = () => {
      const currentTime = new Date();
      let totalFilled = 0;

      for (let d = 0; d < days.length; d++) {
        if (d < day) {
          totalFilled += days[d].length;
        } else if (d === day) {
          for (let i = 0; i < days[d].length; i++) {
            const eventTime = convertTimeToDate(days[d][i].time, d);
            if (eventTime <= currentTime) {
              totalFilled++;
            } else {
              break;
            }
          }
        }
      }
      setFilledHexagons(totalFilled - 1 >= 0 ? totalFilled - 1 : 0);
    };

    const interval = setInterval(checkTimeMatch, 1000);
    return () => clearInterval(interval);
  }, [day, days]);

  return (
    <div className="border-4 border-black pt-8 pb-6 px-6 rounded-2xl bg-[#F7F3F0] overflow-hidden">
      <section className="bg-[#F7F3F0] rounded-xl relative">
        <div className="flex justify-between mb-6">
          <h2 className="font-yerk text-2xl font-bold px-3">
            Timeline - Day {selectedDay + 1}
          </h2>
          <div className="flex gap-3">
            <CustomButton
              disabled={selectedDay <= 0}
              buttonProps={{ className: "mt-0 px-4 py-2 text-lg" }}
              onClick={() => setSelectedDay(selectedDay - 1)}
            >
              {"<"}
            </CustomButton>
            <CustomButton
              disabled={selectedDay >= days.length - 1}
              buttonProps={{ className: "mx-2 px-4 py-2 text-lg" }}
              onClick={() => setSelectedDay(selectedDay + 1)}
            >
              {">"}
            </CustomButton>
          </div>
        </div>

        <div
          ref={timelineRef}
          className="relative overflow-y-hidden overflow-x-auto scrollbar-hide flex"
        >
          <div className="relative flex items-center gap-20 min-w-max ">
            {/* Connecting Line */}
            <div
              className="absolute h-[6px] w-screen bg-black"
              style={{
                left: 0,
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            ></div>
            <div className="grid grid-flow-col gap-16">
              {days.map((dayEvents, dayIndex) =>
                dayIndex === selectedDay
                  ? dayEvents.map((event, eventIndex) => {
                      const totalIndex =
                        days
                          .slice(0, dayIndex)
                          .reduce((acc, curr) => acc + curr.length, 0) +
                        eventIndex;
                      return (
                        <div
                          key={eventIndex}
                          className="flex translate-y-1 flex-col items-center"
                        >
                          <div className="font-bold text-xl mb-4">
                            {event.time}
                          </div>
                          {/* Hexagon */}
                          <div className="flex items-center justify-center">
                            <div
                              className={`w-12 h-12 ${
                                totalIndex <= hexagonsFilled
                                  ? ""
                                  : "clip-hexagon bg-black"
                              } transition-colors duration-300`}
                            >
                              <div
                                className={`w-full h-full clip-hexagon ${
                                  totalIndex <= hexagonsFilled
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
                      );
                    })
                  : null
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;