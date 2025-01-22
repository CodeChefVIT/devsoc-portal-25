'use client';
import React, { useRef, useState, useEffect } from "react";

interface Event {
  time: string;
  description: string;
}

const Timeline: React.FC = () => {
  const [, setActiveIndex] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0); // Store the remaining time from API
  const timelineRef = useRef<HTMLDivElement>(null);

  const events: Event[] = [
    { time: "10:00 AM", description: "Event 1" },
    { time: "11:00 AM", description: "Event 2" },
    { time: "12:00 PM", description: "Event 3" },
    { time: "1:00 PM", description: "Event 4" },
    { time: "2:00 PM", description: "Event 5" },
  ];

  // Function to calculate how many hexagons should be filled
  const getFilledHexagons = (remainingTime: number) => {
    const intervalsPassed = Math.floor(remainingTime / (5 * 60)); 
    return intervalsPassed;
  };

  // Fetch remaining time from the API
  useEffect(() => {
    const fetchRemainingTime = async () => {
      try {
        const response = await fetch("/api/countdown");
        const data = await response.json();
        setRemainingTime(data.remainingTime); // Set remaining time from API
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    };

    fetchRemainingTime();
    const intervalId = setInterval(fetchRemainingTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  const handleScroll = () => {
    if (!timelineRef.current) return;

    const scrollLeft = timelineRef.current.scrollLeft;
    // const containerWidth = timelineRef.current.offsetWidth;
    const totalWidth = timelineRef.current.scrollWidth;

    const totalHexagons = events.length;
    const sectionWidth = totalWidth / totalHexagons;
    const index = Math.min(
      Math.floor(scrollLeft / sectionWidth),
      totalHexagons - 1
    );

    setActiveIndex(index);
  };

  return (
    <main className="p-3 mb-4">
      {/* Timeline */}
      <div className="border-4 border-black p-3 mt-1 rounded-2xl bg-[#F7F3F0]">
        <section className="bg-[#F7F3F0] p-4 rounded-xl relative">
          <h2 className="font-yerk text-xl font-bold mb-4">Timeline</h2>

          {/* Scrollable Timeline */}
          <div
            ref={timelineRef}
            onScroll={handleScroll}
            className="relative overflow-x-auto flex scrollbar-hide px-32" // Add padding to avoid clipping
          >
            {/* Line Connecting Events */}
            <div className="absolute top-1/2 left-0 h-[4px] w-[1500px] bg-black transform -translate-y-1/2"></div>

            {/* Hexagons */}
            <div className="flex flex-nowrap gap-64 relative">
              {events.map((event, index) => {
                const filledHexagons = getFilledHexagons(remainingTime);
                const isFilled = index <= filledHexagons; // Check if this hexagon should be filled

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className={`w-14 h-14 clip-hexagon bg-black scale-125 transition-colors duration-300 top-1/2 transform -translate-y-1/2 relative`}
                    >
                      <div
                        className={`w-full h-full clip-hexagon ${
                          isFilled ? "bg-[#FF6600]" : "bg-[#F7F3F0] scale-[0.92] "
                        }  absolute top-0 left-0 transform`}
                      ></div>
                    </div>

                    {/* Time & Description */}
                    <div className="text-center mt-24">
                      <div className="text-sm font-bold text-[#333]">
                        {event.time}
                      </div>
                      <div className="text-xs text-gray-800 mt-1">
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
