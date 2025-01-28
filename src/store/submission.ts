import {  ISubmission } from "@/interfaces";
import { checkSubmissionExists, getSubmission } from "@/services/submit";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { create } from "zustand";

export interface SubmissionStore {
  submission: ISubmission;
  updateSubmission: (newIdea: ISubmission) => void;
  checkSubmissionExists: () => Promise<boolean>;
  submissionExists: boolean;
  fetch: () => void;
  setSubmissionExists: (value: boolean) => void;
  updateSubmissionField: <K extends keyof ISubmission>(
    field: K,
    value: ISubmission[K]
  ) => void;
}
export const useSubmissionStore = create<SubmissionStore>((set) => ({
  submission: {
    title: "abc123",
    description: "123",
    track: "Open Innovation",
    github_link: "https://github.com/team-alpha/project-alpha",
    figma_link: "https://www.figma.com/file/alpha-design",
    other_link: "https://example.com/project-alpha-other",
  },
  submissionExists: false,
  setSubmissionExists: (value: boolean) => set({ submissionExists: value }),
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
  updateSubmission: (newIdea: ISubmission) => set({ submission: newIdea }),
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
