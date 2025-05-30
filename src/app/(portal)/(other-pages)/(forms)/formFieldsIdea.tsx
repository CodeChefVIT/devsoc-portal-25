import FormItemWrapper from "@/components/form/formItemWrapper";
import { FormSelect, SelectItem } from "@/components/form/formSelectItemOld";
import FormText from "@/components/form/formText";
import { FormField } from "@/components/ui/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "./schema";

interface ProjectFormFieldsProps {
  form: UseFormReturn<z.infer<typeof projectSchema>>;
  tracks?: SelectItem[]; // Assuming `tracks` is an array of strings, adjust as necessary
}
const trackOptions = [
  { value: "Open Innovation", label: "Open Innovation" },
  {
    value: "Environment and Sustainability",
    label: "Environment and Sustainability",
  },
  { value: "Digital Security", label: "Digital Security" },
  { value: "Healthcare and Education", label: "Healthcare and Education" },
  { value: "Finance and Fintech", label: "Finance and Fintech" },
  { value: "Media and Entertainment", label: "Media and Entertainment" },
];

const ProjectFormFields: React.FC<ProjectFormFieldsProps> = ({
  form,
  tracks = trackOptions,
}) => {
  return (
    <div className="flex md:flex-row flex-col justify-center md:gap-20">
      <div className="flex w-full flex-col gap-2">
        {/* Project Name */}
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItemWrapper
              field={field}
              labelText={"Project Name"}
              type={"text"}
              placeholderText="Project Name"
              required
              autoFill
            />
          )}
        />

        {/* Project Track */}
        <FormField
          control={form.control}
          name={"track"}
          render={({ field }) => (
            <FormSelect
              type="Tracks"
              field={field}
              placeholder="Select a track"
              required
              items={tracks}
            />
          )}
        />

        {/* Project Description */}
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormText
              field={field}
              labelText={"Description of the Project"}
              placeholder="Don't forget to include your inspiration, learnings, project construction method, and difficulties you encountered in your writing."
              required
              autoFill
              subtitle="999 max characters."
            />
          )}
        />
              <FormField
          control={form.control}
          name={"other_link"}
          render={() => (
            <div></div>
          )}
        />
        <FormField
          control={form.control}
          name={"figma_link"}
          render={() => <div></div>}

        />

        {/* Github Link */}
        <FormField
          control={form.control}
          name={"github_link"}
          render={() => <div></div>}
        />
      </div>

    </div>
  );
};

export default ProjectFormFields;
