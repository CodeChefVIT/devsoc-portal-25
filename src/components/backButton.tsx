"use client";
import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import CustomButton from "./CustomButton";

export default function BackButton() {
  return (
    <div>
      {" "}
      <CustomButton
        onClick={() => window.history.back()}
        icon={<IoReturnUpBackOutline />}
      >
      </CustomButton>
    </div>
  );
}
