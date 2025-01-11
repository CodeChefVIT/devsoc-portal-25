"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface IAuthFormItem<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  labelText: string;
  subtitle?: string;
  placeholder?: string;
  required?: boolean;
  autoFill?: boolean;
  inputProps?: React.ComponentPropsWithoutRef<typeof Textarea>;
}

const FormText = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  labelText,
  required,
  subtitle,
  placeholder,
  autoFill,
  inputProps,
}: IAuthFormItem<TFieldValues, TName>) => {
  return (
    <FormItem className={"w-full relative space-y-0.5"}>
      <FormLabel className={"font-inter text-neutral-700 font-normal text-xs"}>
        {labelText}
        {required && <span className={"text-red-600"}> *</span>}
      </FormLabel>
      <div className={"relative w-full"}>
        <div className={"relative w-full"}>
          <FormControl>
            <Textarea
              // focus-visible:ring-cc-primary
              className={"outline-0 ring-1 ring-cc-dark font-inter bg-white"}
              autoComplete={autoFill ? "on" : "off"}
              {...(placeholder && { placeholder: placeholder })} // Conditionally pass the placeholder
              {...field}
              rows={7}
              onChange={field.onChange}
              {...inputProps}
            />
          </FormControl>
        </div>
        <FormDescription className="text-sm mt-3 text-right text-muted-foreground">
              {subtitle}
        </FormDescription>

        <FormMessage className={"text-xs mt-1"} />
      </div>
    </FormItem>
  );
};
export default FormText;
