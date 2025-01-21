
import { create } from "zustand";

interface TimerStore {
  timeEnded: boolean;
  EndTimer: () => void
}
export const useTimerStore = create<TimerStore>((set) => ({


  timeEnded: false,
    EndTimer: () => {
        set({timeEnded: true})
    }
}));
