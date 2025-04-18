import { z } from "zod";
const isGitHubLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?github\.com\/.+/i.test(url);

export const githubLinkSchema = z
  .string()
  .optional()
  .refine(isGitHubLink, {
    message: "GitHub link must be a valid GitHub URL (https://github.com/...)",
  })
  .default("");
const isFigmaLink = (url: string | undefined) =>
  !url || /^https:\/\/(www\.)?figma\.com\/.+/i.test(url);

export const projectSchema = z.object({
  title: z.string().min(1, { message: "Project Name is required" }).default(""), // Default title is an empty string

  track: z
    .enum(
      [
        "Open Innovation",
        "Environment and Sustainability",
        "Digital Security",
        "Healthcare and Education",
        "Finance and Fintech",
        "Media and Entertainment",
      ],
      {
        invalid_type_error: "Project Track is required",
      }
    )
    .default("Open Innovation"),

  description: z
    .string()
    .min(1, { message: "Description of the project is required" })
    .max(999, { message: "Description should not exceed 999 characters" })
    .default(""), // Default description is an empty string
  figma_link: z
    .string()
    .optional() // Apply optional first to allow skipping validation if not provided
    .refine((val) => val === "" || isFigmaLink(val), {
      message: "Figma link must be a valid Figma URL (https://figma.com/...)",
    })
    .default(""), // Default Figma link is an empty string

  github_link: githubLinkSchema, // Default GitHub link is an empty string
  other_link: z
    .union([
      z.string().url({ message: "Link must be a valid URL " }),
      z.literal(""),
    ])
    .optional()
    .default(""),
});
