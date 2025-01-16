import { IIdea } from "@/interfaces";
import { checkSubmissionExists, getSubmission } from "@/services/submit";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";

export interface IdeaStore {
  submission: IIdea;
  updateSubmission: (newIdea: IIdea) => void;
  checkSubmissionExists: () => Promise<boolean>;
  submissionExists: boolean;
  fetch: () => void;
  updateSubmissionField: <K extends keyof IIdea>(
    field: K,
    value: IIdea[K]
  ) => void;
}
export const useSubmissionStore = create<IdeaStore>((set) => ({
  submission: {
    title: "abc123",
    description: "123",
    track: "Open Innovation",
    github_link: "https://github.com/team-alpha/project-alpha",
    figma_link: "https://www.figma.com/file/alpha-design",
    ppt_link: "https://example.com/project-alpha-presentation.ppt",
    other_link: "https://example.com/project-alpha-other",
  },
  submissionExists: false,
  checkSubmissionExists: async () => {
    try {
      const submissionExists = await checkSubmissionExists("submission");
      set({ submissionExists: submissionExists });

      return submissionExists;
    } catch (e) {
      if (e instanceof ApiError) {

        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
      return false;
    }
  },
  updateSubmission: (newIdea: IIdea) => set({ submission: newIdea }),
  fetch: async () => {
    try {
      const submissionResponse = await getSubmission("submission");
      set({ submission: submissionResponse });
    } catch (e) {
      if (e instanceof ApiError) {
        toast.error(e.message);
      } else {
        toast.error("unknown error occurred");
      }
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
