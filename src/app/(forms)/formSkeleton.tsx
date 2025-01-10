"use client";
import CustomButton from "@/components/CustomButton";
import { Form } from "@/components/ui/form";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
// add z.infer for all
export default function FormSkeleton<T extends FieldValues>({
  title,
  children,
  buttonText,
  form,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;

  buttonText: string;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="font-monomaniac text-2xl mt-2 mb-5">{title}</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-7"
          >
            <div className="flex rounded-lg flex-col gap-6">
              <div className="flex border-4 bg-cc-plain p-10 pb-16 rounded-lg border-black gap-5">
                <div className="flex w-[700px] flex-col gap-6">{children}</div>
              </div>
              <div className="flex justify-center">
                <CustomButton
                  type="submit"
                  buttonProps={{
                    className: "py-2 text-lg px-10",
                  }}
                >
                  {buttonText}
                </CustomButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
