"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react"

type LabelledInputProps = {
    id: string,
    value?: string,
    required: boolean,
    labelText: string,
    onInputChange: (value: string) => void,
    type: React.InputHTMLAttributes<HTMLInputElement>["type"],
    autoComplete?: boolean,

    labelProps?: Omit<React.ComponentPropsWithoutRef<typeof Label>, 'id' | 'htmlFor'>
    inputProps?: Omit<React.ComponentPropsWithoutRef<typeof Input>, 'type' | 'value' | 'onChange' | 'id' | 'autoComplete'>
}

const LabelledInput = (props: LabelledInputProps)=>{
    return (
        <div>
            <Label
                htmlFor={props.id}
                className={"font-inter mb-1 text-neutral-700 font-normal text-xs"}
                {...props.labelProps}
            >
                {props.labelText}
                {props.required && <span className={"text-red-600"}> *</span>}
            </Label>
            <Input
                id={props.id}
                type={props.type}
                onChange={(e)=>props.onInputChange(e.target.value)}
                // focus-visible:ring-cc-primary
                className={'outline-0 ring-1 ring-cc-dark'}
                autoComplete={props.autoComplete ? "" : "off"}
                {...props.inputProps}
            />
        </div>
    )
}

LabelledInput.displayName = "LabelledInput";

export default LabelledInput;