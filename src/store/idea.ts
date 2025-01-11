import { IIdea } from "@/interfaces";
import { throwAPIError } from "@/lib/error";
import { getSubmission } from "@/services/submit";
import { create } from "zustand";

interface IdeaStore {
  idea: IIdea;
  updateIdea: (newIdea: IIdea) => void;
  fetch: (id: string) => void;
  updateIdeaField: <K extends keyof IIdea>(field: K, value: IIdea[K]) => void;
}
export const useIdeaStore = create<IdeaStore>((set) => ({
  idea: {
    id: "", // UUID
    title: "abc123",
    description: "123",
    track: "Open Innovation",
    github_link: "https://github.com/team-alpha/project-alpha",
    figma_link: "https://www.figma.com/file/alpha-design",
    ppt_link: "https://example.com/project-alpha-presentation.ppt",
    other_link: "https://example.com/project-alpha-other",
  },
  updateIdea: (newIdea: IIdea) => set({ idea: newIdea }),
  fetch: async () => {
    try {
      const ideaResponse = await getSubmission("idea", "teamIDGlobal", );
      set({ idea: ideaResponse });
    } catch (e) {
      throwAPIError(e);
    }
  },

  updateIdeaField: (field, value) =>
    set((state) => ({
      idea: {
        ...state.idea,
        [field]: value,
      },
    })),
}));
