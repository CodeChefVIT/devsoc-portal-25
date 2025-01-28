"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import {Button} from "@/components/ui/button";
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
    <div className="flex flex-col gap-5 items-center">
      <h1 className="font-monomaniac text-2xl mt-2 mb-5">{title}</h1>
      <div className=" w-[75%] flex justify-center rounded-lg  gap-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <div className="bg-cc-plain p-10 pb-16 border-black border-4 rounded-xl max-w-screen-md">
              {children}
            </div>
            <div className="flex justify-center">
              <Button variant={"primary"} size={"primary"} type={"submit"}>
                {buttonText}
              </Button>

            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
