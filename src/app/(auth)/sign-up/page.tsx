"use client"

import React from 'react'
import Modal from "@/app/(auth)/_components/modal";
import {Form, FormField} from "@/components/ui/form";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Link from "@/app/(auth)/_components/custom-link";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {SignupFormType, SignupSchema} from "@/app/(auth)/_schemas/forms.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {ApiError} from "next/dist/server/api-utils";
import {login, signup} from "@/services/auth";
import {redirect, useRouter} from "next/navigation";

const SignUp = () => {

    const form = useForm<SignupFormType>({
        resolver: zodResolver(SignupSchema),
        mode: 'onBlur',
        defaultValues: {
            confirmPassword: '',
            password: '',
            email: '',
        }
    })

    const router = useRouter();

    const onSubmit = async (values: SignupFormType) =>{
        try {
            const res = await signup({
                email: values.email,
                password: values.password
            })
            console.log(res)
            router.push(`/sign-up/verify-otp?email=${encodeURIComponent(values.email)}`)
        } catch(error){
            toast.error((error as Error).message)
        }
    }

    return (
        <div className={'w-full flex justify-center items-center py-5'}>
            <Modal classname={""} text={"Welcome back!"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full max-w-xs flex flex-col items-center gap-6"}>
                        <div className={"flex w-full flex-col gap-6"}>
                            <FormField control={form.control} name={"email"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Email"} type={"text"} required autoFill />
                            )}/>
                            <FormField control={form.control} name={"password"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Password"} type={"password"} required autoFill />
                            )}/>
                            <FormField control={form.control} name={"confirmPassword"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Confirm Password"} type={"password"} required autoFill />
                            )}/>
                        </div>
                        <div className={"flex flex-col justify-center items-center gap-6"}>
                            <div className={"text-sm mt-2 font-inter"}>Already have an account? <Link text={"Log in"} href={"/login"}/></div>
                            <Button variant={"primary"} size={"primary"} type={"submit"}>Create Account</Button>
                        </div>
                    </form>
                </Form>
            </Modal>
        </div>
    )
}
export default SignUp
