import { z } from "zod";

export const projectSchema = z.object({
    projectName: z
      .string()
      .min(1, { message: "Project Name is required" }),
    
    projectTrack: z.enum(["Open Innovation", "Other Track Option 1", "Other Track Option 2"], {
      invalid_type_error: "Project Track is required",
    }),
  
    descriptionOfProject: z
      .string()
      .min(1, { message: "Description of the project is required" })
      .max(500, { message: "Description should not exceed 500 words" }),
  
    figmaLink: z
      .string()
      .url({ message: "Figma link must be a valid URL" })
      .or(z.literal("Placeholder")),
  
    githubLink: z
      .string()
      .url({ message: "GitHub link must be a valid URL" })
      .or(z.literal("Placeholder")),
  
    otherLinks: z
      .string()
      .url({ message: "Other links must be a valid URL" })
      .or(z.literal("Placeholder"))
  });