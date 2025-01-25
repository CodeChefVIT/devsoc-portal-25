"use client"
import React, { useState } from "react";
import Image from "next/image";
import devsoc from "../../public/images/devsoc.png";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for menu and close
import Tracks from "@/components/tracks"; // Import your Tracks component

export default function Navbar() {
  const [showTracks, setShowTracks] = useState(false); // State to toggle Tracks visibility

  return (
    <>
      {/* Navbar */}
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
        <div className="flex items-center gap-4">
          <Link href={"https://discord.gg/M8V6vxXnUq"} className="active:-rotate-12">
            <Image
              src="/images/discord.png"
              alt="Discord Logo"
              width={40}
              height={40}
            />
          </Link>
          <Image src="/images/devsoc.png" alt="Another Logo" width={40} height={40} />
          <Link href="/settings" className="group">
            <Image
              src="/images/settings.png"
              alt="Setting Icon"
              width={40}
              height={40}
              className="transition-transform duration-300 ease-in-out group-active:rotate-180"
            />
          </Link>

          {/* Menu Icon for Track Details (Small Screens) */}
          <button
            className="block md:hidden p-2 rounded-full bg-[#FF6D33] text-white hover:bg-gray-700"
            onClick={() => setShowTracks(!showTracks)}
            aria-label="Toggle Tracks"
          >
            {showTracks ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Tracks Drawer for Small Screens */}
      {showTracks && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
          <div className="relative bg-white p-4 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowTracks(false)}
              aria-label="Close Tracks"
            >
              <X className="h-6 w-6" />
            </button>
            <Tracks />
          </div>
        </div>
      )}
    </>
  );
}
