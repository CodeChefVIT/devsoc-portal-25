import { TimerResponse } from "@/components/ui/timer";
import axios from "axios";
import { create } from "zustand";

interface TimerStore {
  timeLeft: number;
  timeEnded: boolean;
  fetchTimeLeft: () => Promise<void>;
  EndTimer: () => void;
}
export const useTimerStore = create<TimerStore>((set) => ({
  timeLeft: 0,
  timeEnded: false,
  EndTimer: () => {
    set({ timeEnded: true });
  },
  fetchTimeLeft: async () => {
    try {
      const res = await axios.get<TimerResponse>("/api/countdown");

      set({ timeLeft: res.data.remainingTime });
    } catch {}
  },
}));

