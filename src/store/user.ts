import { IUser } from "@/interfaces";
import { getUserDetails } from "@/services/user";
import { create } from "zustand";

interface UserStore {
  user: IUser;
    userIsSet: boolean;
  fetch: () => Promise<void>;
  updateUser: (newUser: IUser) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: {
    first_name: "…",
    last_name: "…",
    email: "hello@example.com",
    reg_no: "…",
    phone_no: "…",
    is_leader: true,
    gender: "M",
    vit_email: "hello@example.com",
    hostel_block: "…",
    room_no: 1,
    github_profile: "https://example.com",
  },
  userIsSet: false,

  fetch: async () => {
    const userResponse = await getUserDetails();
    set({ userIsSet: true });
    set({ user: userResponse });
  },
  updateUser: (newUser: IUser) => set({ user: newUser }),
}));
