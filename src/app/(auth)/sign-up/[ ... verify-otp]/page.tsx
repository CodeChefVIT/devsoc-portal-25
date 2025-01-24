"use client"
export const runtime = "edge";

import React from 'react'
import Modal from "@/app/(auth)/_components/modal";
import Link from "@/app/(auth)/_components/custom-link";
import {Button} from "@/components/ui/button";
import {Form, FormField} from "@/components/ui/form";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {OTPFormSchema, OTPFormType} from "@/app/(auth)/_schemas/forms.schema";
import {verifyOTP} from "@/services/auth"
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {ApiError} from "next/dist/server/api-utils";

const Page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter();

    const form = useForm<OTPFormType>({
        resolver: zodResolver(OTPFormSchema),
        mode: 'onBlur',
        defaultValues: {
            otp: ''
        }
    })

    const onSubmit = async (values: OTPFormType)=>{
        if (!email) return;
        toast.promise(verifyOTP({
            otp: values.otp,
            email,
        }), {
            loading: "Loading...",
            success: "Updated profile!",
            error: (err: ApiError) => err.message,
        }).then(() => {
            router.push("/fill-details/1")
        })
    }

    return (
        <div className={'w-full flex justify-center items-center py-5'}>
            <Modal classname={""} text={"OTP has been sent to your Email"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full max-w-xs flex flex-col items-center gap-4"}>
                        <FormField control={form.control} name={"otp"} render={({field}) => (
                            <AuthFormItem field={field} labelText={"Enter OTP"} type={"text"} required />
                        )}/>
                        <div className={"text-sm mt-2 font-inter"}>Already have an account? <Link text={"Log in"} href={"/login"} /></div>
                        <Link text={"Resent OTP"} className={"block text-sm"} />
                        <Button variant={"primary"} size={"primary"} type={"submit"}>Create Account</Button>
                    </form>
                </Form>
            </Modal>
        </div>
    )
}
export default Page
