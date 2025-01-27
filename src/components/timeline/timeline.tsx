"use client";
import { useTimerStore } from "@/store/timer";
import React, { useRef, useState, useEffect, useMemo } from "react";
import CustomButton from "../CustomButton";

interface Event {
  time: string;
  description: string;
}
const getDayValue = () => {
  const today = new Date();
  const day = today.getDate();

  if (day === 3) {
    return 0;
  } else if (day === 4) {
    return 1;
  } else if (day == 5) {
    return 2;
  } else {
    return 0;
  }
};

const Timeline: React.FC = () => {
  const timeLeft = useTimerStore((state) => state.timeLeft);
  const [day, setDay] = useState(getDayValue());
  useEffect(() => {
    setDay(getDayValue());

    const intervalId = setInterval(() => {
      setDay(getDayValue());
    }, 12 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  const [hexagonsFilled, setFilledHexagons] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  const timelineRef = useRef<HTMLDivElement>(null);
  console.log("Current timeLeft:", timeLeft);
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    // Update ref whenever `timeLeft` changes
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);
  const days: Event[][] = useMemo(
    () => [
      // Day 1 - 03.02.2025
      [
        { time: "9:00 AM", description: "Doors open and check-in", day: 1 },
        { time: "10:00 AM", description: "Opening Ceremony", day: 1 },
        { time: "11:00 AM", description: "Hacking Session", day: 1 },
        { time: "1:00 PM", description: "Lunch Break", day: 1 },
        { time: "2:00 PM", description: "Hacking Session", day: 1 },
        {
          time: "3:30 PM",
          description: "Informative Tech Session - 1",
          day: 1,
        },
        { time: "4:30 PM", description: "Hacking Session", day: 1 },
        { time: "7:00 PM", description: "Dinner Break", day: 1 },
        { time: "9:00 PM", description: "Hacking Session", day: 1 },
        { time: "10:00 PM", description: "Engagement Activity", day: 1 },
        { time: "11:30 PM", description: "Review 1", day: 1 },
      ],

      // Day 2 - 04.02.2025
      [
        { time: "2:30 AM", description: "Hacking Session", day: 2 },
        { time: "6:00 AM", description: "Breakfast Break", day: 2 },
        { time: "9:00 AM", description: "Hacking Session", day: 2 },
        { time: "12:00 PM", description: "Lunch Break", day: 2 },
        { time: "2:00 PM", description: "Hacking Session", day: 2 },
        {
          time: "4:00 PM",
          description: "Informative Tech Session - 2",
          day: 2,
        },
        { time: "5:30 PM", description: "Hacking Session", day: 2 },
        { time: "7:00 PM", description: "Dinner Break", day: 2 },
        { time: "9:00 PM", description: "Hacking Session", day: 2 },
      ],

      // Day 3 - 05.02.2025
      [
        { time: "12:00 AM", description: "Review 2", day: 3 },
        { time: "3:00 AM", description: "Hacking Session", day: 3 },
        { time: "5:30 AM", description: "Final Submission", day: 3 },
        { time: "6:00 AM", description: "Breakfast Break", day: 3 },
        { time: "9:00 am", description: "Final Pitches", day: 3 },
        {
          time: "11:00 AM",
          description: "Prize Distribution and Closing Ceremony",
          day: 3,
        },
      ],
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
      const normalizedPeriod = period.toUpperCase();

      let convertedHours =
        normalizedPeriod === "PM" && hours !== 12 ? hours + 12 : hours;
      if (normalizedPeriod === "AM" && hours === 12) convertedHours = 0; // Special case for 12 AM

      const date = new Date(today);
      date.setHours(convertedHours, minutes, 0, 0); // Set hours and minutes
      return date;
    };

    const checkTimeMatch = () => {
      const currentTime = new Date(); // Get the current date/time

      // Find the most recent event whose time is less than or equal to the current time
      let latestEventIndex = -1;
      let previousEvents = 0;
      for (let i = 0; i < day; i++) {
        previousEvents += days[i].length;
      }
      for (let i = 0; i < days[day].length; i++) {
        const eventTime = convertTimeToDate(days[day][i].time);

        if (eventTime <= currentTime) {
          latestEventIndex = i; // Update the latest index to this event
        } else {
          break;
        }
      }
      if (latestEventIndex !== -1) {
        setFilledHexagons(previousEvents + latestEventIndex); // Set to the most recent past event
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
  }, [days]);

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
          <div className="flex justify-between ">
            <h2 className="font-yerk text-xl font-bold px-3 mb-4">
              Timeline - Day {selectedDay + 1}
            </h2>
            <div className="flex gap-2 ">
              <CustomButton
                disabled={selectedDay < 1}
                buttonProps={{ className: "mt-0" }}
                onClick={() => setSelectedDay(selectedDay - 1)}
              >
                {" "}
                {"<"}{" "}
              </CustomButton>
              <CustomButton
                disabled={selectedDay > 1}
                buttonProps={{ className: "mx-2" }}
                onClick={() => setSelectedDay(selectedDay + 1)}
              >
                {" "}
                {">"}{" "}
              </CustomButton>
            </div>
          </div>

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
              {days.map((dayEvents, dayIndex) => {
                let previousEvents = 0;
                for (let i = 0; i < dayIndex; i++) {
                  previousEvents += days[i].length;
                }
                return (
                  dayIndex === selectedDay &&
                  dayEvents.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="flex -translate-y-1 flex-col items-center"
                    >
                      {/* Time - Above the hexagon */}
                      <div className="font-bold text-lg mb-2">{event.time}</div>

                      {/* Hexagon */}
                      <div className="flex items-center justify-center">
                        <div
                          className={`w-7 h-7 ${
                            eventIndex + previousEvents <= hexagonsFilled ? "":"clip-hexagon bg-black"}    transition-colors duration-300`}
                        >
                          <div
                            className={`w-full h-full clip-hexagon  ${
                              eventIndex + previousEvents <= hexagonsFilled
                                ? "bg-[#FF6600] scale-[1.30]"
                                : "bg-[#F7F3F0]  scale-[0.83] "
                            } transform`}
                          ></div>
                        </div>
                      </div>

                      {/* Description - Below the hexagon */}
                      <div className="text-center mt-2">
                        <div className="text-xs max-w-40 overflow-visible text-wrap text-gray-800">
                          {event.description}
                        </div>
                      </div>
                    </div>
                  ))
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
