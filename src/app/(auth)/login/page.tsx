"use client"

import React from 'react'
import Modal from "@/app/(auth)/_components/modal";
import Link from "@/app/(auth)/_components/custom-link";
import {Button} from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormType, LoginSchema } from "@/app/(auth)/_schemas/forms.schema";

import {
    Form,
    FormField,
} from "@/components/ui/form"
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import {login, signup} from "@/services/auth";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {ApiError} from "next/dist/server/api-utils";

const Login = () => {
    const router = useRouter();

    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginSchema),
        mode: 'onBlur',
        defaultValues: {
            password: '',
            email: ''
        }
    })

    const onSubmit = async (values: LoginFormType)=>{
        // toast.promise(login({
        //     email: values.email,
        //     password: values.password
        // }), {
        //     loading: "Loading...",
        //     success: "logged in successfully",
        //     error: (err: ApiError) => err.message,
        // }).then((data: any) => {
        //     if (data.is_profile_complete) router.push(`/github-activity`);
        //     else router.push(`/fill-details/1`);
        // })
        try {
            const res = await login({
                email: values.email,
                password: values.password
            })
            console.log(res)
            if ((res as { is_profile_complete: boolean } ).is_profile_complete){
                router.push(`/github-activity`)
            } else {
                router.push(`/fill-details/1`);
            }
        } catch(error){
            toast.error((error as Error).message)
        }
    }

    return (
        <div className={'w-full flex justify-center items-center'}>
            <Modal classname={""} text={"Welcome back!"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full max-w-xs flex flex-col items-center gap-10"}>
                        <div className={"flex w-full flex-col gap-6"}>
                            <FormField control={form.control} name={"email"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Email"} type={"text"} required autoFill />
                            )} />
                            <FormField control={form.control} name={"password"} render={({field})=>(
                                <div className={"relative w-full"}>
                                    <AuthFormItem field={field} labelText={"Password"} type={"password"} required autoFill />
                                    <Link text={"Recover Password"} className={"mt-1 absolute right-0 text-xs"} />
                                </div>
                            )} />
                        </div>
                        <div className={"flex flex-col justify-center items-center gap-6"}>
                            <div className={"text-sm mt-2 font-inter"}>Don&apos;t have an account? <Link text={"Sign Up"} href={"/sign-up"} /></div>
                            <Button variant={"primary"} size={"primary"} type={"submit"}>Login</Button>
                        </div>
                    </form>
                </Form>
            </Modal>
        </div>
    )
}
export default Login
