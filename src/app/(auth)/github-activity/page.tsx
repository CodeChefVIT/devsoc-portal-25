import React from 'react'
import InfoWrapper from "@/app/(auth)/fill-details/_components/info-wrapper";
import Modal from "@/app/(auth)/_components/modal";
import Image from "next/image";
import {Button} from "@/components/ui/button";

const GithubActivityPage = () => {



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
                <Button variant={"primary"} size={"primary"} type={"button"}>Continue</Button>
            </div>
        </InfoWrapper>
    )
}
export default GithubActivityPage
