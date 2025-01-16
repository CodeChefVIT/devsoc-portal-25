import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {defaultUserDetails, UserDetailsFormType, UserDetailsSchema} from "@/app/(auth)/_schemas/forms.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";

import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

interface FormStore {
    formData: UserDetailsFormType
    updateFormData: (data: Partial<UserDetailsFormType>) => void,
    clearFormData: () => void,
    error: boolean,
    setError: ()=>void,
}

export const useFormStore = create<FormStore>()(
    set => ({
            formData: defaultUserDetails,
            updateFormData: (data) => set((state) => ({
                formData: { ...state.formData, ...data }
            })),
            clearFormData: () => set({ formData: defaultUserDetails, error: false}),
            error: false,
            setError: ()=>set({ error: true }),
        })
)

const InfoForm = ({
    children,
    onSubmit,
    className,
}: {
    children: React.ReactNode,
    onSubmit?: SubmitHandler<UserDetailsFormType>;
    className?: string;
}) => {
    const { formData } = useFormStore()
    const form = useForm<UserDetailsFormType>({
        resolver: zodResolver(UserDetailsSchema),
        mode: 'onBlur',
        defaultValues: formData
    })

    return (
        <Form {...form}>
            <form
                className={className}
                onSubmit={onSubmit ? form.handleSubmit(onSubmit) : (e: React.FormEvent) => e.preventDefault()}
            >
                {children}
            </form>
        </Form>
    )
}
export default InfoForm
