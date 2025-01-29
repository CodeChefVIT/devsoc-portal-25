import React from "react";
import Image from "next/image";
import DevsocText from "@/assets/images/DevsocText.svg";

interface IAuthModal {
  children: React.ReactNode;
  text?: string;
  branding?: boolean;
  classname?: string;
}

const Modal = ({ branding = true, text, classname, children }: IAuthModal) => {
  return (
    <div
      className={`w-fit p-8 bg-cc-plain border-4 border-cc-dark flex flex-col justify-center items-center rounded-2xl ${classname}`}
    >
      <Image
        src={DevsocText}
        alt="DevSOC"
        height={200}
        width={600}
        className="h-auto w-full max-w-xs"
      />
      {branding && (
        <div className={"flex font-yerk text-cc-primary relative select-none"}>
          {/* <div className={"text-6xl"}>DEVSOC</div>
          <div
            className={"rotate-90 text-xs absolute -right-3 inset-y-0 bottom-2"}
          >
            2K25
          </div> */}
        </div>
      )}
      {text && (
        <div className={"font-monomaniac text-2xl mt-2 mb-3"}>{text}</div>
      )}
      {children}
    </div>
  );
};
export default Modal;
