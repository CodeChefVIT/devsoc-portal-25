import { IIdeas } from "@/interfaces";
import { create } from "zustand";



interface IdeaStore {
  idea: IIdeas;
  updateIdea: (newIdea: IIdeas) => void;
  updateIdeaField: <K extends keyof IIdeas>(field: K, value: IIdeas[K]) => void;
}
export const useIdeaStore = create<IdeaStore>((set) => ({
  idea: {
    id: "", // UUID
    title: "", // TEXT, not null
    description: "", // TEXT, not null
    track: "", // TEXT, not null
    team_id: "", // UUID, not null
    is_selected: true, // BOOLEAN, not null
    created_at: new Date(), // TIMESTAMP, default: CURRENT_TIMESTAMP
    updated_at: new Date(), // TIMESTAMP, default: CURRENT_TIMESTAMP
  },
  updateIdea: (newIdea: IIdeas) => set({ idea: newIdea }),
  updateIdeaField: (field, value) =>
    set((state) => ({
      idea: {
        ...state.idea,
        [field]: value,
      },
    })),
}));
