import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import AuthFormItem from "../../app/(auth)/_components/auth-form-item";

interface FormItemProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  labelText: string;
  type: "text" | "password" | "tel";
  placeholderText?: string
  required?: boolean;
  autoFill?: boolean;
}

const FormItemWrapper = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  field,
  labelText,
  type,
  required,
  placeholderText,
  autoFill,
}: FormItemProps<TFieldValues, TName>) => {
  return (
    <AuthFormItem
      field={field}
      labelText={labelText}
      type={type}
      required={required}
      autoFill={autoFill}
      
      inputProps={{
        ...(placeholderText && { placeholder: placeholderText }), 
        className: "co border w-full bg-white border-black py-5",
      }}
    />
  );
};

export default FormItemWrapper;
