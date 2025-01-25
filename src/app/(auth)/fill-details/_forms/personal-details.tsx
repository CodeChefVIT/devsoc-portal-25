"use client";

import React, {useEffect} from 'react'
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Modal from "@/app/(auth)/_components/modal";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import AuthFormDropdown from "@/app/(auth)/_components/auth-form-dropdown";
import {genders, hostels} from "@/app/(auth)/_schemas/constants";
import {useFormContext} from "react-hook-form";
import {UserDetailsFormType} from "@/app/(auth)/_schemas/forms.schema";
import {useFormStore} from "@/app/(auth)/fill-details/_components/info-form";
const removeTrailingSlash = (url: string) => {
    return url.replace(/\/+$/, '');
  };
const PersonalDetails = () => {
    const router = useRouter();
    const form = useFormContext<UserDetailsFormType>();
    const { updateFormData, error } = useFormStore();

    const handleNext = () => {
        const { firstName, lastName, hostelBlock, roomNo, githubProfile, regNo, phoneNo, gender } = form.getValues();
        const cleanedProfile = removeTrailingSlash(githubProfile);
        updateFormData({ firstName, lastName, hostelBlock, roomNo, githubProfile: cleanedProfile, regNo, phoneNo, gender })
        router.push("/fill-details/2");
        return;
    }

    useEffect(() => {
        if (error) form.trigger();
    }, [error]);

    return (
        <div className={"my-0 flex justify-center overflow-scroll w-full"}>
            <Modal branding={false} classname={"px-12 py-8 flex gap-2"}>
                <div className='flex gap-5'>
                    <InfoFormField name={'firstName'} render={({ field })=>(
                        <AuthFormItem field={field} labelText={"First Name"} type={"text"} required />
                    )} />
                    <InfoFormField name={'lastName'} render={({ field })=>(
                        <AuthFormItem field={field} labelText={"Last Name"} type={"text"} required />
                    )} />
                </div>
                <InfoFormField name={'githubProfile'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Github Profile"} type={"text"} required />
                )} />
                <InfoFormField name={'regNo'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Registation Number"} type={"text"} required />
                )} />
                <InfoFormField name={'phoneNo'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Phone Number"} type={"tel"} required />
                )} />
                <InfoFormField name={'gender'} render={({ field })=>(
                    <AuthFormDropdown items={Object.keys(genders)} labelText={"Gender"} field={field} required />
                )} />
                                <InfoFormField name={'roomNo'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Room Number"} type={"number"} required />
                )} />

                <InfoFormField name={'hostelBlock'} render={({ field })=>(
                    <AuthFormDropdown items={hostels} labelText={"Hostel Block"} field={field} required />
                )} />
                <Button variant={"primary"} size={"primary"} type={"button"} className={"my-2"} onClick={handleNext}>
                    Next
                </Button>
            </Modal>
        </div>
    )
}
export default PersonalDetails
