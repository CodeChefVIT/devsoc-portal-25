import React from 'react'
import Image from "next/image";

interface InfoWrapperProps {
    pageTitle: string,
    emojiSrc: string,
    children: React.ReactNode
}

const InfoWrapper = ({
    pageTitle,
    emojiSrc,
    children
}: InfoWrapperProps) => {
    return (
        <main className={'py-5 px-10 w-full h-full min-h-screen'}>
            <h1 className={"text-3xl font-monomaniac w-full text-center"}>{pageTitle}</h1>
            <div className={"w-full grid grid-cols-2"}>
                <section className={"flex justify-center items-end"}>
                    <Image
                        src={emojiSrc}
                        className={'size-80'}
                        height={400}
                        width={400}
                        alt={'emoji'}
                    />
                </section>
                <section>
                    {children}
                </section>
            </div>
        </main>
    )
}
export default InfoWrapper
