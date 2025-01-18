import { IUser } from "@/interfaces";
import { getUser, updateUserDetails } from "@/services/user";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStore {
  user: IUser;
  userIsSet: boolean;
  fetch: () => Promise<void>;
  updateUser: (newUser: IUser) => Promise<void>;
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
    vit_email: "first.last202X@vitstudent.ac.in",
    hostel_block: "…",
    room_no: 1,
    github_profile: "https://example.com",
  },
  userIsSet: false,

  fetch: async () => {
    try {
      const userResponse = await getUser();
      set({ userIsSet: true });
      set({ user: userResponse });
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
    }
  },
  updateUser: async (newUser: IUser) =>{
    try {
      await updateUserDetails(newUser);
      set({ user: newUser })
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
    }
  },
}));