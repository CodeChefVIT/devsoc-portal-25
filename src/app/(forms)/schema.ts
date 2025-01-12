import { z } from "zod";
const isGitHubLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?github\.com\/.+/i.test(url);

export const githubLinkSchema = z
  .string()
  .url({ message: "GitHub link must be a valid URL" })
  .or(z.literal(""))
  .refine(isGitHubLink, {
    message: "GitHub link must be a valid GitHub URL (https://github.com/...)",
  })
  .default("");
const isFigmaLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?figma\.com\/.+/i.test(url);

export const projectSchema = z.object({
  title: z.string().min(1, { message: "Project Name is required" }).default(""), // Default title is an empty string

  track: z
    .enum(["Open Innovation", "Other Track Option 1", "Other Track Option 2"], {
      invalid_type_error: "Project Track is required",
    })
    .default("Open Innovation"),

  description: z
    .string()
    .min(1, { message: "Description of the project is required" })
    .max(500, { message: "Description should not exceed 500 words" })
    .default(""), // Default description is an empty string

  figma_link: z
    .string()
    .url({ message: "Figma link must be a valid URL" })
    .or(z.literal(""))
    .refine(isFigmaLink, {
      message: "Figma link must be a valid Figma URL (https://figma.com/...)",
    })
    .default(""), // Default Figma link is an empty string

  github_link: githubLinkSchema, // Default GitHub link is an empty string

  other_link: z.string().optional().or(z.literal("").optional()).default(""), // Default other link is an empty string
});
