"use client";
import React from "react";
import FormSkeleton from "../formSkeleton";
import { useForm } from "react-hook-form";

export default function Idea() {
  const form = useForm();
  return (
    <div>
      <FormSkeleton
        onSubmit={(data) => {
          console.log(data);
        }}
        form={form}
        buttonText="Submit"
        title="Submit An Idea For Devsoc'25"
      >
        HI
      </FormSkeleton>
    </div>
  );
}
