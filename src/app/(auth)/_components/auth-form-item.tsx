"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import InfoButtonWithTooltip from "@/components/customTooltip";

interface IAuthFormItem<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  disabled?: boolean;
  tooltip?: string;
  labelText: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  subtitle?: string;
  required?: boolean;
  autoFill?: boolean;
  inputProps?: React.ComponentPropsWithoutRef<typeof Input>;
}

const AuthFormItem = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  labelText,
  type,
  disabled = false,
  tooltip,
  required,
  subtitle,
  autoFill = true,
  inputProps,
}: IAuthFormItem<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormItem className={"w-full relative space-y-0.5"}>
      <FormLabel className={"font-inter text-neutral-700 font-normal items-center flex text-xs"}>
        {tooltip && <InfoButtonWithTooltip text={tooltip}></InfoButtonWithTooltip>}
        {labelText}
        {required && <span className={"text-red-600"}> *</span>}
      </FormLabel>
      <div className={"relative w-full"}>
        <div className={"relative w-full"}>
          <FormControl>
            <Input
              type={
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : "text"
              }
              disabled={disabled}
              // focus-visible:ring-cc-primary
              className={
                "outline-0 ring-1 ring-cc-dark font-inter bg-white pr-7"
              }
              autoComplete={autoFill ? "on" : "off"}
              {...field}
              {...inputProps}
            />
          </FormControl>
          {subtitle && (
            <FormDescription className="text-sm mt-2  text-muted-foreground">
              {subtitle}
            </FormDescription>
          )}
          {type === "password" && (
            <div
              className={"absolute right-0 top-0 h-full flex items-center pr-2"}
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? (
                <EyeOff className={"size-4 text-neutral-700"} />
              ) : (
                <Eye className={"size-4 text-neutral-700"} />
              )}
            </div>
          )}
        </div>
        <FormMessage className={"text-xs mt-1"} />
      </div>
    </FormItem>
  );
};
export default AuthFormItem;
