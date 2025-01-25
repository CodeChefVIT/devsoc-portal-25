"use client"
import React from 'react'
import InfoWrapper from "@/app/(auth)/fill-details/_components/info-wrapper";
import Modal from "@/app/(auth)/_components/modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {checkIfRepoStarred} from "@/services/auth";
import toast from "react-hot-toast";
import {ApiError} from "next/dist/server/api-utils";
import {ConvertToAPIError} from "@/lib/error";

const GithubActivityPage = () => {
    const router = useRouter();

    const handleClickContinue = async () => {
        toast.promise(
    async () => {
                const isRepoStarred = await checkIfRepoStarred();
                if (!isRepoStarred) {
                    const error = new Error("You have to start something on github before you proceed!");
                    return ConvertToAPIError(error);
                }
                router.push("/dashboard");
             },
            {
                loading: "Checking...",
                error: (err: ApiError) => err.message,
            }
        );
    }

    return (
        <InfoWrapper emojiSrc={"/images/emoji_alert.svg"} wrapperClass={"justify-center"}>
            <div className={"w-full h-full flex flex-col justify-around items-center space-y-24"}>
                <Modal classname={'px-10 max-w-sm py-6 flex flex-col items-center justify-around gap-5'} branding={false}>
                    <Image
                        src={"/icons/alert.svg"}
                        alt={"github-activity-alert"}
                        height={142}
                        width={142}
                        className={"size-28"}
                    />
                    <p className={"font-inter text-center"}>You have to start something on github before you proceed!</p>
                </Modal>
                <div className={"flex gap-4"}>
                    <Link href={"#"} target={"_blank"}>
                        <Button variant={"primary"} size={"primary"} type={"button"} className={"flex gap-2 justify-between"}>
                            <span>Github</span>
                            <ExternalLinkIcon className={"size-5"} />
                        </Button>
                    </Link>
                    <Button variant={"primary"} size={"primary"} type={"button"} onClick={handleClickContinue}>Continue</Button>
                </div>
            </div>
        </InfoWrapper>
    )
}
export default GithubActivityPage
