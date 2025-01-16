import React from 'react'
import Image from "next/image";

const Navbar = () => {
    return (
        <div className={"fixed top-0 z-[99999] w-full h-16 bg-cc-primary flex items-center shadow-md"}>
            <Image
                src={"/icons/devsoc-logo.svg"}
                height={48}
                width={48}
                className={"size-12 ml-8"}
                alt={"logo"}
            />
        </div>
    )
}
export default Navbar
