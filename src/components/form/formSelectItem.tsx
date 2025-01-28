export interface SelectItem {
  value: string;
  label: string;
}

interface FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
> {
  type: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  required: boolean;
  items: SelectItem[];
  placeholder?: string;
}
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export const FormSelect = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({
  type,
  required = false,
  items,
  field,
  placeholder = "Select an option",
}: FormSelectProps<TFieldValues, TName>) => {
  return (
    <FormItem className={"w-full relative space-y-0.5"}>
      <FormLabel className={"font-inter text-neutral-700 font-normal text-xs"}>
        {type}
        {required && <span className={"text-red-600"}> *</span>}
      </FormLabel>
      <FormControl>
        <Select {...field} onValueChange={field.onChange} value={field.value || ""}>
          <SelectTrigger className=" outline-0 ring-1 ring-cc-dark font-inter bg-white px-3 py-5">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                className="max-w-96 px-3 py-3"
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
};
