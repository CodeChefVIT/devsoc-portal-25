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
      className={`w-fit p-8 bg-cc-plain border-4 border-cc-dark flex flex-col justify-center items-center rounded-2xl ${classname}`}
    >
      <div
          className="text-black font-yerk font-bold text-3xl  ml-4"
          
        >
          
        </div>
      {branding && (
        <div className={"flex font-yerk text-cc-primary relative select-none"}>
          <div className={"text-4xl"}>Internal-Hack</div>
          
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
