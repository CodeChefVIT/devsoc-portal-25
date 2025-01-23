import React from "react";
import { Button } from "./ui/button";
interface IButton {
  disabled?: boolean;
  icon?: React.ReactNode; // Icon can be a React element (like an icon component)
  children?: React.ReactNode; // Children prop to render any nested elements
  type?: "button" | "submit" | "reset"; // Type of the button, defaulting to "submit"
  buttonProps?: React.ComponentPropsWithoutRef<typeof Button>;
  onClick?: () => void; // A function that handles the click event
}
export default function CustomButton({
  disabled,
  icon,
  children,
  type = "button",
  onClick,
  buttonProps: inputProps,
}: IButton) {
  return (
    <Button
      type={type}
      disabled={disabled}
      {...inputProps}
      className={`disabled:bg-[#C89D8D]  bg-cc-primary hover:bg-[#ff5e1e] py-5 rounded-xl  ${
        inputProps?.className || ""
      }`}
      onClick={onClick}
    >
      <div className="flex font-monomaniac gap-2 items-center text-lg">
        {icon}
        {children}
      </div>
    </Button>
  );
}
