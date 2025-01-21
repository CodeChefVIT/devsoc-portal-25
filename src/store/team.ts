import { ITeam } from "@/interfaces";
import { getTeam } from "@/services/team";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface TeamStore {
  team: ITeam;
  userIsSet: boolean;
  fetch: () => Promise<void>;
  updateTeam: (newUser: ITeam) => Promise<void>;
}
export const useTeamStore = create<TeamStore>((set) => ({
  team: {
    code: "", // Default team code
    members: [], // Empty array as the default for team members
    number_of_people: 0, // Default to zero members initially
    round_qualified: 0, // Default round qualification as 0 (not qualified)
    team_name: "", // Default team name
  },
  userIsSet: false,

  fetch: async () => {
    try {
      const teamResponse = await getTeam();
      console.log(teamResponse);
      set({ userIsSet: true });
      set({ team: teamResponse });
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
    }
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
