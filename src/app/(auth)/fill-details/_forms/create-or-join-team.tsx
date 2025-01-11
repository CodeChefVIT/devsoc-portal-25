"use client"
import React, {useState} from 'react'
import Modal from "@/app/(auth)/_components/modal";
import Toggle from "@/app/(auth)/_components/toggle";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";
import {UserDetailsFormType} from "@/app/(auth)/_schemas/forms.schema";
import {useRouter} from "next/navigation";
import {useFormStore} from "@/app/(auth)/fill-details/_components/info-form";

const CreateOrJoinTeam = () => {
    const [ checked, setChecked ] = useState(true);

    const form = useFormContext<UserDetailsFormType>();

    const router = useRouter();

    const { formData, clearFormData } = useFormStore();

    const onSubmit = async ()=>{
        //TODO: Toasts

        // console.log(form.getValues());
        const { createTeam, joinTeam } = form.getValues();

        const values = { ...formData, createTeam, joinTeam };

        const isPersonalDetailsFilled = values.firstName && values.lastName && values.email && values.phoneNo && values.gender ;
        if (!isPersonalDetailsFilled) return router.push('/fill-details/1');

        const isCollegeDetailsFilled = values.roomNo && values.githubProfile && values.vitEmail && values.hostelBlock && values.regNo;
        if (!isCollegeDetailsFilled) return router.push('/fill-details/2');

        const isTeamDetailsFilled = values.createTeam || values.joinTeam;
        if (!isTeamDetailsFilled) return;

        clearFormData();
        alert("Success");
    }

    return (
        <div className={"h-full w-full flex flex-col items-center justify-around space-y-24"}>
            <Modal branding={false} classname={"px-12 py-8 flex gap-4"}>
                <div className={"font-inter text-sm flex flex-col items-center gap-2"}>
                    <p>Create a new Team?</p>
                    <Toggle checked={checked} setChecked={setChecked} text={checked?"Yes":"No"} />
                    {checked ? (
                        <p>Team Leader Makes The New Team</p>
                    ): (
                        <p>Join An Existing Team</p>
                    )}
                </div>
                <InfoFormField name={checked?"createTeam":"joinTeam"} render={({field})=>(
                    <AuthFormItem field={field} labelText={checked?"Team Name":"Team Code"} type={"text"} required />
                )} />
            </Modal>
            <div className={"w-full flex flex-col items-center gap-2 max-w-sm"}>
                <div className={"w-full flex justify-around"}>
                    <Button variant={"primary"} size={"primary"} type={"button"}>Skip</Button>
                    <Button variant={"primary"} size={"primary"} type={"submit"} onClick={onSubmit}>Continue</Button>
                </div>
                <p className={"text-xs font-inter"}>You can join / create a team later!</p>
            </div>
        </div>
    )
}
export default CreateOrJoinTeam
