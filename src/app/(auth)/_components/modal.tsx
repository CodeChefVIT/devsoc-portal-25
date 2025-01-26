import React from "react";

interface IAuthModal {
  children: React.ReactNode;
  text?: string;
  branding?: boolean;
  classname?: string;
}

const Modal = ({ branding = true, text, classname, children }: IAuthModal) => {
  return (
    <div
      className={`w-fit px-10 py-14 bg-cc-plain border-4 border-cc-dark flex flex-col justify-center items-center rounded-2xl ${classname}`}
    >
      {/* TODO: Add Devsoc2k25 SVG */}
      {/* {branding && (
        <div className={"flex font-yerk text-cc-primary relative select-none"}>
          <div className={"text-6xl"}>DEVSOC</div>
          <div
            className={"rotate-90 text-xs absolute -right-3 inset-y-0 bottom-2"}
          >
            2K25
          </div>
        </div>
      )} */}
      {text && (
        <div className={"font-monomaniac text-2xl mt-2 mb-3"}>{text}</div>
      )}
      {children}
    </div>
  );
};
export default Modal;
