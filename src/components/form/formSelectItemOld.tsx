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
          <select
            {...field}
            onChange={field.onChange}
            className="outline-none ring-1 ring-black font-inter bg-white text-sm md:py-3 px-3 py-3 rounded-md w-full  "
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </FormControl>
      </FormItem>
    );
  };
  