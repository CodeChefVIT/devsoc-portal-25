import { ITeam } from "@/interfaces";
import { getTeam } from "@/services/team";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface TeamStore {
  team: ITeam;
  teamIsSet: boolean;
  fetch: () => Promise<void>;
  updateTeam: (newUser: ITeam) => Promise<void>;
  removeMember: (email: string) => Promise<void>;
}
export const useTeamStore = create<TeamStore>((set) => ({
  team: {
    code: "",
    members: [],
    number_of_people: 0,
    round_qualified: 0,
    team_name: "",
  },
  teamIsSet: false,

  fetch: async () => {
    try {
      const teamResponse = await getTeam();
      set({ teamIsSet: true });
      set({ team: teamResponse });
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
    }
  },
  removeMember: async (email: string) => {
    set((state) => ({
      team: {
        ...state.team, // Keep other properties of team intact
        members: state.team.members.filter((member) => member.email !== email), // Remove the member
      },
    }));
  },
  updateTeam: async (newTeam: ITeam) => {
    try {
      set({ team: newTeam });
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
    }
  },
}));
