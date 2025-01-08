"use client"

import React from 'react'
import Modal from "@/app/(auth)/_components/modal";
import {Form, FormField} from "@/components/ui/form";
import AuthFormItem from "@/app/(auth)/_components/auth-form-item";
import Link from "@/app/(auth)/_components/custom-link";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {SignupFormType, SignupSchema} from "@/app/(auth)/_schemas/schema";
import {zodResolver} from "@hookform/resolvers/zod";

const SignUp = () => {

    const form = useForm<SignupFormType>({
        resolver: zodResolver(SignupSchema),
        mode: 'onBlur',
        defaultValues: {
            confirmPassword: '',
            password: '',
            email: '',
            phoneNo: '',
            regNo: '',
            username: ''
        }
    })

    const onSubmit = (values: SignupFormType)=>{
        // if (values.password !== values.confirmPassword){
        //     form.setError("confirmPassword", { type: "custom", message: "Passwords don't match" });
        //     return;
        // }
        console.log(values)
    }

    return (
        <div className={'w-full flex justify-center items-center py-5'}>
            <Modal classname={""} text={"Welcome back!"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full max-w-xs flex flex-col items-center gap-6"}>
                        <div className={"flex w-full flex-col gap-6"}>
                            <FormField control={form.control} name={"username"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Username"} type={"text"} required autoFill />
                            )}/>
                            <FormField control={form.control} name={"email"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Email"} type={"text"} required autoFill />
                            )}/>
                            <FormField control={form.control} name={"regNo"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Registration No."} type={"text"} required autoFill />
                            )}/>
                            <FormField control={form.control} name={"phoneNo"} render={({field}) => (
                                <AuthFormItem field={field} labelText={"Phone No."} type={"tel"} required autoFill />
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
