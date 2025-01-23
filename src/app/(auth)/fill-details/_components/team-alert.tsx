import React, {useState} from 'react'
import {TriangleAlert, X} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

const TeamAlert = ({
    open
}: {
    open: boolean
}) => {

    const [alertOpen, setAlertOpen] = useState(open);

    if (!alertOpen) return <></>;

    return (
        <div className={"bg-[#3DFFD4] py-3 px-4 w-full flex justify-between items-center text-sm"}>
            <div className={"flex flex-1 grow w-full items-center gap-3 font-inter"}>
                <TriangleAlert />
                <p>If You do not have a team at the moment, consider joining the discord to socialize and form your dream team!</p>
            </div>
            <div className={"flex gap-4 items-center"}>
                <Link href={"https://discord.gg/M8V6vxXnUq"} target={"_blank"} className={"flex items-center gap-2 bg-indigo-500 p-1.5 px-3 rounded-lg"}>
                    <span><FaDiscord className={"size-8 bg-[#5865F2] text-white p-1 rounded-md shadow-sm"} /></span>
                    <span className={"text-white"}>Join Discord</span>
                </Link>
                <X onClick={()=>setAlertOpen(false)} />
            </div>
        </div>
    )
}
export default TeamAlert
