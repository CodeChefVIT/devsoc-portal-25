import { create } from "zustand";
interface User {
  id: string; // UUID
  name?: string; // TEXT, optional as notNull is false
  team_id?: string; // UUID, optional as notNull is false
  email?: string; // TEXT, optional as notNull is false
  is_vitian?: boolean; // BOOLEAN, optional as notNull is false
  reg_no?: string; // TEXT, optional as notNull is false
  password?: string; // TEXT, optional as notNull is false
  phone_no?: string; // TEXT, optional as notNull is false
  role?: string; // TEXT, optional as notNull is false
  is_leader?: boolean; // BOOLEAN, optional as notNull is false
  college?: string; // TEXT, optional as notNull is false
  is_verified?: boolean; // BOOLEAN, optional as notNull is false
}
interface UserStore {
  user: User;
  updateUser: (newUser: User) => void;
  updateUserField: <K extends keyof User>(field: K, value: User[K]) => void;
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
  updateUser: (newUser: User) => set({ user: newUser }),
  updateUserField: (field, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [field]: value,
      },
    })),
}));
