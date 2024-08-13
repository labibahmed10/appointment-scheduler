/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ISelectDropdown {
  placeholder: string;
  items: string[];
  register?: any;
  onChange?: (value: string) => void;
  value?: string;
}

const SelectDropdown = forwardRef<HTMLSelectElement, ISelectDropdown>(({ placeholder, items, register, onChange, value }, ref) => {
  return (
    <Select ref={ref} value={value} onValueChange={onChange} {...register}>
      <SelectTrigger className="w-full sm:w-44 h-7 sm:h-9 text-xs sm:text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});

export default SelectDropdown;
