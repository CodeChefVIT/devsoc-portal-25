import React from "react";
import { Button } from "./ui/button";
interface IButton {
  disabled?: boolean
  icon?: React.ReactNode; // Icon can be a React element (like an icon component)
  children?: React.ReactNode; // Children prop to render any nested elements
  onClick?: () => void; // A function that handles the click event
}
export default function CustomButton({ disabled, icon, children, onClick }: IButton) {
  return (
    <Button disabled={disabled} className="disabled:bg-[#C89D8D] bg-cc-primary hover:bg-[#ff5e1e] py-5  rounded-xl" onClick={onClick}>
      <div className="flex   items-center">
        {icon}
        {children}
      </div>
    </Button>
  );
}
