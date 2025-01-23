"use client";

import React, {useEffect} from 'react'
import InfoFormField from "@/app/(auth)/fill-details/_components/info-form-field";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Modal from "@/app/(auth)/_components/modal";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import AuthFormDropdown from "@/app/(auth)/_components/auth-form-dropdown";
import {genders} from "@/app/(auth)/_schemas/constants";
import {useFormContext} from "react-hook-form";
import {UserDetailsFormType} from "@/app/(auth)/_schemas/forms.schema";
import {useFormStore} from "@/app/(auth)/fill-details/_components/info-form";

const PersonalDetails = () => {
    const router = useRouter();
    const form = useFormContext<UserDetailsFormType>();
    const { updateFormData, error } = useFormStore();

    const handleNext = () => {
        const { firstName, lastName, email, phoneNo, gender } = form.getValues();
        updateFormData({ firstName, lastName, email, phoneNo, gender })
        router.push("/fill-details/2");
        return;
    }

    useEffect(() => {
        ;(async()=>error && await form.trigger())()
    }, [error, form]);

    return (
        <div className={"my-0 flex justify-center w-full"}>
            <Modal branding={false} classname={"px-12 py-8 flex gap-2"}>
                <InfoFormField name={'firstName'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"First Name"} type={"text"} required />
                )} />
                <InfoFormField name={'lastName'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Last Name"} type={"text"} required />
                )} />
                <InfoFormField name={'email'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Email"} type={"email"} required />
                )} />
                <InfoFormField name={'phoneNo'} render={({ field })=>(
                    <AuthFormItem field={field} labelText={"Phone Number"} type={"tel"} required />
                )} />
                <InfoFormField name={'gender'} render={({ field })=>(
                    <AuthFormDropdown items={Object.keys(genders)} labelText={"Gender"} field={field} required />
                )} />
                <Button variant={"primary"} size={"primary"} type={"button"} className={"my-2"} onClick={handleNext}>
                    Next
                </Button>
            </Modal>
        </div>
    )
}
export default PersonalDetails
