import { IUser } from "@/interfaces";
import { getUserDetails } from "@/services/getUser";
import { create } from "zustand";

interface UserStore {
  user: IUser;
  fetch: () => void
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
    role: "",
    is_leader: false,
    college: "",
    is_verified: false,
  },
  fetch: async() => {
    const userResponse = await getUserDetails()
    set({user: userResponse})
  } 
//   updateUser: (newUser: User) => set({ user: newUser }),
//   updateUserField: (field, value) =>
//     set((state) => ({
//       user: {
//         ...state.user,
//         [field]: value,
//       },
//     })),
}));
