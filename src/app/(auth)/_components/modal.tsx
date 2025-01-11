import React from 'react'

interface IAuthModal {
    children: React.ReactNode,
    text?: string,
    branding?: boolean,
    classname?: string
}

const Modal = ({
    branding = true,
    text,
    classname,
    children
}: IAuthModal) => {
    return (
        <div className={`w-fit min-w-96 p-10 py-14 bg-cc-plain border-4 border-cc-dark flex flex-col justify-center items-center rounded-2xl ${classname}`}>
            {branding && <div className={"flex font-yerk text-cc-primary relative mb-3 select-none"}>
                <div className={"text-6xl"}>DEVSOC</div>
                <div className={"rotate-90 text-xs absolute -right-3 inset-y-0 bottom-2"}>2K25</div>
            </div>}
            {text && <div className={"font-monomaniac text-2xl mt-2 mb-5"}>{text}</div>}
            {children}
        </div>
    )
}
export default Modal
