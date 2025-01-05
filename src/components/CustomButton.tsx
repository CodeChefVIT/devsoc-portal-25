import React from "react";
import { Button } from "./ui/button";
interface IButton {
  icon: React.ReactNode; // Icon can be a React element (like an icon component)
  children?: React.ReactNode; // Children prop to render any nested elements
  onClick?: () => void; // A function that handles the click event
}
export default function CustomButton({ icon, children, onClick }: IButton) {
  return (
    <Button className="bg-orange-500" onClick={onClick}>
      <div className="flex items-center">
        {icon}
        {children}
      </div>
    </Button>
  );
}
