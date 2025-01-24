import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import AuthFormItem from "../auth-form-item-v1";

interface FormItemProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  field?: ControllerRenderProps<TFieldValues, TName>;
  labelText: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  subtitle?: string
  disabled?: boolean;
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
  subtitle,
  type,
  disabled =false,
  required,
  placeholderText,
  autoFill,
}: FormItemProps<TFieldValues, TName>) => {
  return (
    <AuthFormItem
      field={field}
      subtitle={subtitle}
      labelText={labelText}
      type={type}
      required={required}
      autoFill={autoFill}
      disabled={disabled}
      inputProps={{
        ...(placeholderText && { placeholder: placeholderText }), 
        className: "co border w-full bg-white border-black py-5",
      }}
    />
  );
};

export default FormItemWrapper;
