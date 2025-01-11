import { z } from "zod";

// Utility functions to validate specific domain URLs
const isGitHubLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?github\.com\/.+/i.test(url);

const isFigmaLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?figma\.com\/.+/i.test(url);

export const projectSchema = z.object({
  title: z.string().min(1, { message: "Project Name is required" }),

  track: z.enum(
    ["Open Innovation", "Other Track Option 1", "Other Track Option 2"],
    {
      invalid_type_error: "Project Track is required",
    }
  ),

  description: z
    .string()
    .min(1, { message: "Description of the project is required" })
    .max(500, { message: "Description should not exceed 500 words" }),

  figma_link: z
    .string()
    .url({ message: "Figma link must be a valid URL" })
    .or(z.literal("Placeholder"))
    .refine(isFigmaLink, {
      message: "Figma link must be a valid Figma URL (https://figma.com/...)",
    }),

  github_link: z
    .string()
    .url({ message: "GitHub link must be a valid URL" })
    .or(z.literal("Placeholder"))
    .refine(isGitHubLink, {
      message:
        "GitHub link must be a valid GitHub URL (https://github.com/...)",
    }),

    other_link: z
    .string()
    .optional()
    .or(z.literal("Placeholder").optional()),
});
