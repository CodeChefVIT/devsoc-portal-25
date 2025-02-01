"use client";
import { Menu } from "lucide-react"; // Icons for menu and close
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
// import devsoc from "../../public/images/devsoc.png";
import devsoc from "@/assets/images/DEVSOC.svg";
import Link from "next/link";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
// import Tracks from "./tracks";
import { DialogTitle } from "@radix-ui/react-dialog";
// import devText from "@/assets/images/PORTAL.svg"
import discord from "@/assets/images/discord.svg";
import settings from "@/assets/images/settings.svg";

export default function Navbar() {
  const router = useRouter();
  // const [showTracks, setShowTracks] = useState(false); // State to toggle Tracks visibility

  function handleLogout() {
    return toast.promise(
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
      className="flex justify-between items-center px-4 sticky top-0 z-10 shadow-lg"
      style={{ backgroundColor: "#FF6D33", height: "75px" }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Link href={"/dashboard"}>
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
        {/* <Link
          href={"/dashboard"}
        >
        <Image 
          src={devText}
          alt="DEVSOC"
          width={239}
          height={56}
          className="ml-5 w-[68%]"
        />
        </Link> */}
      </div>
      {/* Right Section */}
      <div className=" items-center gap-4 hidden md:flex">
        {/* <Timer /> */}
        {/* change to real timer */}
        <Link
          target="__value"
          href={"https://discord.gg/M8V6vxXnUq"}
          className="active:-rotate-12 "
        >
          <Image src={discord} alt="Discord Logo" width={45} height={45} />
        </Link>
        <Link target="__value" href={"https://devsoc.codechefvit.com/"}>
          <Image src={devsoc} alt="Another Logo" width={40} height={40} />
        </Link>
        <Link href="/settings" className="group ">
          <Image
            src={settings}
            alt="Setting Icon"
            width={45}
            height={45}
            className="transition-transform duration-300 ease-in-out group-active:rotate-180"
          />
        </Link>
        <CustomButton
          onClick={handleLogout}
          buttonProps={{ className: "border-2 border-white " }}
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
            {/* <DialogTrigger asChild>
              <DropdownMenuItem className="text-white hover:bg-[#fe7842]">
                <div
                  onClick={() => setShowTracks(!showTracks)}
                  aria-label="Toggle Tracks"
                >
                  Tracks
                </div>
              </DropdownMenuItem>
            </DialogTrigger> */}

            <Link href="/settings">
              <DropdownMenuItem className=" text-white hover:bg-[#fe7842]">
                {" "}
                <div>Profile</div>
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
          {/* <Tracks /> */}
        </DialogContent>
      </Dialog>
    </header>
  );
}
