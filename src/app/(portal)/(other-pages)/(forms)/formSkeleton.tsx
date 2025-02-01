"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col md:gap-5 items-center">
      <h1 className="font-monomaniac text-2xl mt-5 md:mt-2  mb-5">{title}</h1>
      <div className=" w-[90%] md:w-[75%] flex justify-center rounded-lg  gap-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <div className="bg-cc-plain md:p-5 md:pb-16 gap-4 md:gap-20 px-4 py-6 border-black border-4 rounded-xl max-w-screen-md">
              {children}
            </div>
            <div className="mb-5 md:mb-0 flex justify-center">
              <Button
                disabled={form.formState.isSubmitting}
                variant={"primary"}
                size={"primary"}
                type={"submit"}
              >
                {form.formState.isSubmitting ? buttonText + "ing...." : buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
