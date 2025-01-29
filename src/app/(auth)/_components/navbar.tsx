import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className={
        " top-0 z-[99999] w-full h-[75px] bg-cc-primary flex items-center shadow-md p-4 min-h-fit"
      }
    >
      <Image
        src={"/icons/devsoc-logo.svg"}
        height={40}
        width={40}
        alt={"logo"}
      />
    </div>
  );
};
export default Navbar;
