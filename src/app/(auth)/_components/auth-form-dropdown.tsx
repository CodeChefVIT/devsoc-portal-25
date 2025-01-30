import React from "react";

import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InfoFormDropdownProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  items: string[];
  labelText: string;
  required: boolean;
  field: ControllerRenderProps<TFieldValues, TName>;
}

const AuthFormDropdown = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  labelText,
  required,
  items,
}: InfoFormDropdownProps<TFieldValues, TName>) => {
  return (
    <FormItem className={"w-full relative space-y-0.5"}>
      <FormLabel className={"font-inter text-neutral-700 font-normal text-xs"}>
        {labelText}
        {required && <span className={"text-red-600"}> *</span>}
      </FormLabel>

      <FormControl>
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger
            className={`bg-white shadow-none font-inter outline-0 ring-1 ring-cc-dark font-inter ${
              field.value === "" && "text-neutral-400"
            }`}
          >
            <SelectValue placeholder={"Select"} />
          </SelectTrigger>
          <SelectContent className={"ring-1 ring-cc-dark"}>
            {items.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage className={"text-xs mt-2"} />
    </FormItem>
  );
};
export default AuthFormDropdown;
