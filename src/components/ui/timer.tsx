"use client";
import { useTimerStore } from "@/store/timer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TimeCount {
  hours: string;
  minutes: string;
  seconds: string;
}

export interface TimerResponse {
  message: string;
  remainingTime: number;
}

const getTimeLeft = (expiry: number): TimeCount => {
  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  const difference = expiry - new Date().getTime();

  if (difference <= 0) {
    return { hours, minutes, seconds };
  }

  const hrs = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const mnt = Math.floor((difference / (1000 * 60)) % 60);
  const snd = Math.floor((difference / 1000) % 60);

  hours = hrs < 10 ? `0${hrs}` : hrs.toString();
  minutes = mnt < 10 ? `0${mnt}` : mnt.toString();
  seconds = snd < 10 ? `0${snd}` : snd.toString();

  return { hours, minutes, seconds };
};

const Timer = () => {
    const EndTimer = useTimerStore((state) => state.EndTimer);
    const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<TimeCount>();
  const [expiryTime, setExpiryTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await axios.get<TimerResponse>("/api/countdown");
        const data = res.data;
        if (data.remainingTime > 0) {
          const expiry = new Date().getTime() + data.remainingTime * 1000;
          setExpiryTime(expiry);
        } else if (data.remainingTime <= 0) {
          EndTimer();
        }
      } catch {
        //uncomment when needed (redirected to somewhere if timer not started) (or login done)
        // router.push("/dashboard");
      }
    };

    void fetchTime();
  }, [router, EndTimer]);

  useEffect(() => {
    if (!expiryTime) return;

    const interval = setInterval(() => {
      const time = getTimeLeft(expiryTime);
      setTimeLeft(time);

      if (
        time.hours === "00" &&
        time.minutes === "00" &&
        time.seconds === "00"
      ) {
        clearInterval(interval); // Stop the countdown when it reaches zero
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [expiryTime]);

  useEffect(() => {
    if (
      timeLeft?.hours === "00" &&
      timeLeft?.minutes === "00" &&
      timeLeft?.seconds === "00"
    ) {
      EndTimer();
    }
  }, [timeLeft, EndTimer]);

  return (
 
    timeLeft && (
      <div className="bg-white text-black border border-black rounded-lg px-4 py-2 font-bold text-lg" >
        <h1 >{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</h1>
      </div>
    )
  );
};

export default Timer;
