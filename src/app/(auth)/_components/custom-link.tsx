import React from "react";
import Link from "next/link";

interface ILink {
  text: string;
  onClick?: () => void;
  className?: string;
  href?: string;
}

const CustomLink = ({ text, onClick, className, href }: ILink) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`text-cc-link hover:text-violet-700 active:text-neutral-700 select-none hover:cursor-pointer ${className}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <span
      className={`text-cc-link hover:text-violet-700 active:text-neutral-700 select-none hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
export default CustomLink;
