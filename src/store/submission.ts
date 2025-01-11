import { IIdea } from "@/interfaces";
import { throwAPIError } from "@/lib/error";
import { getSubmission } from "@/services/submit";
import { create } from "zustand";

export interface IdeaStore {
  submission: IIdea;
  updateSubmission: (newIdea: IIdea) => void;
  fetch: (id: string) => void;
  updateSubmissionField: <K extends keyof IIdea>(field: K, value: IIdea[K]) => void;
}
export const useSubmissionStore = create<IdeaStore>((set) => ({
  submission: {
    id: "", // UUID
    title: "abc123",
    description: "123",
    track: "Open Innovation",
    github_link: "https://github.com/team-alpha/project-alpha",
    figma_link: "https://www.figma.com/file/alpha-design",
    ppt_link: "https://example.com/project-alpha-presentation.ppt",
    other_link: "https://example.com/project-alpha-other",
  },
  updateSubmission: (newIdea: IIdea) => set({ submission: newIdea }),
  fetch: async () => {
    try {
      const ideaResponse = await getSubmission("idea", "teamIDGlobal", );
      set({ submission: ideaResponse });
    } catch (e) {
      throwAPIError(e);
    }
  },

  updateSubmissionField: (field, value) =>
    set((state) => ({
      submission: {
        ...state.submission,
        [field]: value,
      },
    })),
}));
