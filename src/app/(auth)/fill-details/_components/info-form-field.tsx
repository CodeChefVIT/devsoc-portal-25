import React, {ReactElement} from 'react'
import {Path, useFormContext, ControllerRenderProps} from "react-hook-form";
import {UserDetailsFormType} from "@/app/(auth)/_schemas/forms.schema";
import {FormField} from "@/components/ui/form";

interface IInfoFormField {
    name: Path<UserDetailsFormType>,
    render: (props: {
        field: ControllerRenderProps<UserDetailsFormType, Path<UserDetailsFormType>>
    }) => ReactElement
}

const InfoFormField = ({
    name,
    render
}: IInfoFormField) => {
    const { control } = useFormContext<UserDetailsFormType>();
    return (
        <FormField
            control={control}
            name={name}
            render={({ field })=>render({ field })}
        />
    )
}
export default InfoFormField
