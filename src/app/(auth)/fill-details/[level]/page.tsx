"use client"

import React from 'react'
import InfoWrapper from "@/app/(auth)/fill-details/_components/info-wrapper";
import PersonalDetails from "@/app/(auth)/fill-details/_forms/personal-details";
import CreateOrJoinTeam from "@/app/(auth)/fill-details/_forms/create-or-join-team";
import {notFound} from "next/navigation";
import InfoForm from "@/app/(auth)/fill-details/_components/info-form";
import TeamAlert from "@/app/(auth)/fill-details/_components/team-alert";

const pageEmojis = [
    "/images/emoji_1.svg",
    "/images/emoji_2.svg",
    "/images/emoji_3.svg",
];

const formPage = (level: string) => {

    if (level === '1'){
        return <InfoWrapper pageTitle={"Tell Us About Yourself"} emojiSrc={pageEmojis[0]}>
            <PersonalDetails />
        </InfoWrapper>
    }



    else if (level === '2'){
        return <div>
            <TeamAlert open={true} />
            <InfoWrapper pageTitle={"Team Formation"} emojiSrc={pageEmojis[1]}>
                <CreateOrJoinTeam />
            </InfoWrapper>
        </div>
    }

    else {
        notFound();
    }
}

const FillDetailsPage = ({
    params
}: {
    params: Promise<{ level: string }>
}) => {
    const { level } = React.use(params)

    return (
        <InfoForm className={"w-full h-full"}>
            {formPage(level)}
        </InfoForm>
    )

}
export default FillDetailsPage
