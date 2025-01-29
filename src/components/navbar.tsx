"use client";
import { Menu } from "lucide-react"; // Icons for menu and close
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import Image from "next/image";
import devsoc from "../../public/images/devsoc.png";
import Link from "next/link";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import Tracks from "./tracks";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Navbar() {
  const router = useRouter();
  const [showTracks, setShowTracks] = useState(false); // State to toggle Tracks visibility

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
      <Link
          href={"/dashboard"}
        >
        <Image
          src={devsoc}
          alt="DEVSOC Logo"
          width={40}
          height={40}
          className="ml-5"
        />
        </Link>
        <Link
          className="text-white font-yerk font-bold text-3xl  ml-4"
          href={"/dashboard"}
        >
          <div className="-mb-1">PORTAL</div>
        </Link>
      </div>
      {/* Right Section */}
      <div className=" items-center gap-4 hidden md:flex">
        {/* <Timer /> */}
        {/* change to real timer */}
        <Link
          href={"https://discord.gg/M8V6vxXnUq"}
          className="active:-rotate-12 "
        >
          <Image
            src="/images/discord.png"
            alt="Discord Logo"
            width={40}
            height={40}
          />
        </Link>
        <Link
          href={"https://devsoc.codechefvit.com/"}
        >
          <Image
            src="/images/devsoc.png"
            alt="Another Logo"
            width={40}
            height={40}
          />
        </Link>
        <Link href="/settings" className="group ">
          <Image
            src="/images/settings.png"
            alt="Setting Icon"
            width={40}
            height={40}
            className="transition-transform duration-300 ease-in-out group-active:rotate-180"
          />
        </Link>
        <CustomButton
          onClick={handleLogout}
          buttonProps={{ className: "border border-white " }}
        >
          Logout
        </CustomButton>
      </div>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden block">
            {" "}
            <Menu className="  text-white "></Menu>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-cc-primary ">
            <DropdownMenuLabel>Other options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-white hover:bg-[#fe7842]">
                <div
                  onClick={() => setShowTracks(!showTracks)}
                  aria-label="Toggle Tracks"
                >
                  Tracks
                </div>
              </DropdownMenuItem>
            </DialogTrigger>

            <Link href="/settings">
              <DropdownMenuItem className=" text-white hover:bg-[#fe7842]">
                {" "}
                <div>Settings</div>
              </DropdownMenuItem>
            </Link>
            <Link href={"https://discord.gg/M8V6vxXnUq"}>
              <DropdownMenuItem className=" text-white hover:bg-[#fe7842]">
                {" "}
                Discord
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-[#fe7842] text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <Tracks />
        </DialogContent>
      </Dialog>
    </header>
  );
}
