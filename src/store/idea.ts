import { IIdea } from "@/interfaces";
import { checkSubmissionExists, getSubmission } from "@/services/submit";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";
// If there's any way to refactor it so that we just use a submission store, please say. 
//Currently I only change two variable's names.
// Maybe array with in 0 index Idea and in 1 index submission
export interface SubmissionStore {
  idea: IIdea;
  updateSubmission: (newIdea: IIdea) => void;
  checkSubmissionExists: () => Promise<boolean>;
  submissionExists: boolean;
  fetch: () => void;
  setSubmissionExists: (value: boolean) => void;

  updateSubmissionField: <K extends keyof IIdea>(
    field: K,
    value: IIdea[K]
  ) => void;
}
export const useIdeaStore = create<SubmissionStore>((set) => ({
  idea: {
    title: "",
    description: "",
    track: "Open Innovation",
    github_link: "",
    figma_link: "",
    other_link: "",
  },
  submissionExists: false,
  setSubmissionExists: (value: boolean) => set({ submissionExists: value }),
  checkSubmissionExists: async () => {
    try {
      const submissionExists = await checkSubmissionExists("idea");
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
  updateSubmission: (newIdea: IIdea) => set({ idea: newIdea }),
  fetch: async () => {
    try {
      const submissionResponse = await getSubmission("idea");
      set({ idea: submissionResponse });
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
      idea: {
        ...state.idea,
        [field]: value,
      },
    })),
}));
