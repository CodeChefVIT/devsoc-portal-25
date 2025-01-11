import { IUser } from "@/interfaces";
import { throwAPIError } from "@/lib/error";
import { getUserDetails } from "@/services/user";
import { create } from "zustand";

interface UserStore {
  user: IUser;
  fetch: () => void;
  updateUser: (newUser: IUser) => void;

}
export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: "",
    name: "",
    team_id: "",
    email: "",
    is_vitian: false,
    reg_no: "",
    password: "",
    phone_no: "",
    gender: "male",
    role: "",
    is_leader: false,
    college: "",
    is_verified: false,
  },

  fetch: async () => {
    try {
      const userResponse = await getUserDetails();
      set({ user: userResponse });
    } catch (e) {
      throwAPIError(e);
    }
  },
  updateUser: (newUser: IUser) => set({ user: newUser }),
  // updateUserField: (field, value) =>
  //   set((state) => ({
  //     user: {
  //       ...state.user,
  //       [field]: value,
  //     },
  //   })),
}));
