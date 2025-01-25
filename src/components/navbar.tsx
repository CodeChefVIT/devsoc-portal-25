"use client";
import React from "react";
import Image from "next/image";
import devsoc from "../../public/images/devsoc.png";
import Link from "next/link";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  function handleLogout(): void {
    toast.promise(
      async () => {
        await logout();
        router.push("/login");
      },
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: (err: ApiError) => err.message,
      }
    );
  }

  return (
    <header
      className="flex justify-between items-center px-4"
      style={{ backgroundColor: "#FF6D33", height: "65px" }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Image
          src={devsoc}
          alt="DEVSOC Logo"
          width={40}
          height={40}
          className="ml-5"
        />
        <Link
          className="text-white font-yerk font-bold text-3xl ml-4"
          href={"/dashboard"}
        >
          PORTAL
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-centeur gap-4">
        {/* <Timer /> */}
        {/* change to real timer */}
        <Link
          href={"https://discord.gg/M8V6vxXnUq"}
          className="active:-rotate-12"
        >
          <Image
            src="/images/discord.png"
            alt="Discord Logo"
            width={40}
            height={40}
          />
        </Link>
        <Image
          src="/images/devsoc.png"
          alt="Another Logo"
          width={40}
          height={40}
        />
        <Link href="/settings" className="group">
          <Image
            src="/images/settings.png"
            alt="Setting Icon"
            width={40}
            height={40}
            className="transition-transform duration-300 ease-in-out group-active:rotate-180"
          />
        </Link>
        <CustomButton onClick={handleLogout} buttonProps={{className: "border border-white"}} >Logout</CustomButton>
      </div>
    </header>
  );
}
