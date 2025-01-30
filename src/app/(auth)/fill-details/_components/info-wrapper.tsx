import React from "react";
import Image from "next/image";

interface InfoWrapperProps {
  pageTitle?: string;
  emojiSrc: string;
  children: React.ReactNode;
  wrapperClass?: string;
  emojiSectionClass?: string;
}

const InfoWrapper = ({
  pageTitle,
  emojiSrc,
  children,
  wrapperClass,
  emojiSectionClass,
}: InfoWrapperProps) => {
  return (
    <main
      className={`w-full h-full flex flex-col justify-start gap-10 ${wrapperClass}`}
    >
      {pageTitle && (
        <h1 className={"text-3xl font-monomaniac w-full text-center"}>
          {pageTitle}
        </h1>
      )}
      <div className={"w-full md:grid grid-cols-2"}>
        <section className={"md:flex justify-center items-center  h-full hidden"}>
          <Image
            src={emojiSrc}
            className={` ${emojiSectionClass}`}
            height={400}
            width={400}
            alt={"emoji"}
          />
        </section>
        <section className="w-full">{children}</section>
      </div>
    </main>
  );
};
export default InfoWrapper;
