"use client";
import React from "react";
import CustomButton from "./CustomButton";

export default function BackButton() {
  return (
    <div>
      {" "}
      <CustomButton
        onClick={() => window.history.back()}
      >
        {"<"}
      </CustomButton>
    </div>
  );
}
