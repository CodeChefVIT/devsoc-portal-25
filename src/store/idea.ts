import { IIdea } from "@/interfaces";
import { checkSubmissionExists, getSubmission } from "@/services/submit";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
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
  ideaExists: () => {
    return checkSubmissionExists("/idea");
  },
  updateIdea: (newIdea: IIdea) => set({ idea: newIdea }),
  fetch: async () => {
    toast.promise(
      async () => {
        const ideaResponse = await getSubmission("idea");
        set({ idea: ideaResponse });
      },
      {
        loading: "Loading...",
        success: "Updated idea!",
        error: (err: ApiError) => err.message,
      }
    );
  },

  updateIdeaField: (field, value) =>
    set((state) => ({
      idea: {
        ...state.idea,
        [field]: value,
      },
    })),
}));
