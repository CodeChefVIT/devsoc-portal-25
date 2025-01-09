interface SelectItem {
  value: string;
  label: string;
}

interface ThemeSelectProps {
  type: string;
  required: boolean;
  items: SelectItem[];
  placeholder?: string;
}
import { FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormSelect: React.FC<ThemeSelectProps> = ({
  type,
  required = false,
  items,
  placeholder = "Select an option",
}) => {
  return (
    <div>
      <FormLabel className={"font-inter text-neutral-700 font-normal text-xs"}>
        {type}
        {required && <span className={"text-red-600"}> *</span>}
      </FormLabel>
      <Select>
        <SelectTrigger className="max-w-96 outline-0 ring-1 ring-cc-dark font-inter bg-white px-3 py-5">
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
    </div>
  );
};
