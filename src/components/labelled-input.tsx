"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {useState} from "react"
import {Eye, EyeOff} from "lucide-react";

type LabelledInputProps = {
    id: string,
    value?: string,
    required?: boolean,
    labelText: React.ReactNode; 
    labelClassName?: string; 
    onInputChange: (value: string) => void,
    className?: string,
    type: React.InputHTMLAttributes<HTMLInputElement>["type"],
    autoFill?: boolean,
    disabled?: boolean,
    placeholder?: string,
    labelProps?: Omit<React.ComponentPropsWithoutRef<typeof Label>, 'id' | 'htmlFor'>
    inputProps?: Omit<
        React.ComponentPropsWithoutRef<typeof Input>,
        'type' | 'value' | 'onChange' | 'id' | 'autoComplete' | 'disabled'
    >
}

const LabelledInput = (props: LabelledInputProps)=>{
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className={"w-full"}>
            <Label
                htmlFor={props.id}
                className={"font-inter mb-1 text-neutral-700 font-normal text-xs"}
                {...props.labelProps}
            >
                {props.labelText}
                {props.required && <span className={"text-red-600"}> *</span>}
            </Label>
            <div className={"relative w-full"}>
                <Input
                    id={props.id}
                    type={props.type === "password" ? showPassword ? "text" : "password" : props.type}
                    value = {props.value ?? ''}
                    onChange={(e)=>props.onInputChange(e.target.value)}
                    placeholder={props.placeholder}
                    // focus-visible:ring-cc-primary
                    className={`outline-0 ring-1 ring-cc-dark font-inter bg-white ${props.className}`}
                    autoComplete={props.autoFill ? "on" : "off"}
                    disabled={props.disabled}
                    {...props.inputProps}
                />
                {props.type === "password" && (
                    <div
                        className={"absolute right-0 top-0 h-full flex items-center pr-2"}
                        onClick={()=>setShowPassword(show=>!show)}
                    >{ showPassword
                        ? <EyeOff className={"size-4 text-neutral-700"} />
                        : <Eye className={"size-4 text-neutral-700"} />
                    }
                    </div>
                )}
            </div>
        </div>
    )
}

LabelledInput.displayName = "LabelledInput";

export default LabelledInput;