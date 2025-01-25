"use client";

import React from "react";
import InfoWrapper from "@/app/(auth)/fill-details/_components/info-wrapper";
import Modal from "@/app/(auth)/_components/modal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { pingStar } from "@/services/auth";
import Link from "next/link";

const GithubActivityPage = () => {
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      await pingStar();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error pinging /auth/star:", error);
    }
  };

  return (
    <InfoWrapper
      emojiSrc={"/images/emoji_alert.svg"}
      wrapperClass={"justify-center"}
    >
      <div
        className={
          "w-full h-full flex flex-col justify-around items-center space-y-24"
        }
      >
        <Modal
          classname={
            "px-10 max-w-sm py-6 flex flex-col items-center justify-around gap-5"
          }
          branding={false}
        >
          <Image
            src={"/icons/alert.svg"}
            alt={"github-activity-alert"}
            height={142}
            width={142}
            className={"size-28"}
          />
          <p className={"font-inter text-center"}>
            Please star the below repository before continuing
          </p>
          <Link
            href="https://github.com/conductor-oss/conductor/"
            className="hover:underline text-blue-800"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub Link
          </Link>
        </Modal>
        <Button
          variant={"primary"}
          size={"primary"}
          type={"button"}
          onClick={handleButtonClick}
        >
          Continue
        </Button>
      </div>
    </InfoWrapper>
  );
};
export default GithubActivityPage;
