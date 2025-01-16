import React from 'react'
import {TriangleAlert, X} from "lucide-react";

const Alert = ({
    text
}: {
    text: string
}) => {
    return (
        <div className={"bg-[#3DFFD4] w-full flex justify-between"}>
            <div className={"flex flex-1 grow w-full"}>
                <TriangleAlert />
                <p>{text}</p>
            </div>
            <div className={"flex"}>
                <button>

                </button>
                <X />
            </div>
        </div>
    )
}
export default Alert
